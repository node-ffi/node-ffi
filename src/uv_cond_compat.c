#include <pthread.h>
#include <assert.h>
#include <errno.h>

#include <sys/time.h>

#undef NANOSEC
#define NANOSEC ((uint64_t) 1e9)


#ifdef _WIN32

unsigned long uv_thread_self(void) {
  return (unsigned long) GetCurrentThreadId();
}

inline static int uv_cond_fallback_init(uv_cond_t* cond);
inline static void uv_cond_fallback_destroy(uv_cond_t* cond);
inline static void uv_cond_fallback_signal(uv_cond_t* cond);
inline static void uv_cond_fallback_broadcast(uv_cond_t* cond);
inline static void uv_cond_fallback_wait(uv_cond_t* cond, uv_mutex_t* mutex);
inline static int uv_cond_fallback_timedwait(uv_cond_t* cond,
    uv_mutex_t* mutex, uint64_t timeout);

inline static int uv_cond_condvar_init(uv_cond_t* cond);
inline static void uv_cond_condvar_destroy(uv_cond_t* cond);
inline static void uv_cond_condvar_signal(uv_cond_t* cond);
inline static void uv_cond_condvar_broadcast(uv_cond_t* cond);
inline static void uv_cond_condvar_wait(uv_cond_t* cond, uv_mutex_t* mutex);
inline static int uv_cond_condvar_timedwait(uv_cond_t* cond,
    uv_mutex_t* mutex, uint64_t timeout);


/* This condition variable implementation is based on the SetEvent solution
 * (section 3.2) at http://www.cs.wustl.edu/~schmidt/win32-cv-1.html
 * We could not use the SignalObjectAndWait solution (section 3.4) because
 * it want the 2nd argument (type uv_mutex_t) of uv_cond_wait() and
 * uv_cond_timedwait() to be HANDLEs, but we use CRITICAL_SECTIONs.
 */

inline static int uv_cond_fallback_init(uv_cond_t* cond) {
  /* Initialize the count to 0. */
  cond->fallback.waiters_count = 0;

  InitializeCriticalSection(&cond->fallback.waiters_count_lock);

  /* Create an auto-reset event. */
  cond->fallback.signal_event = CreateEvent(NULL,  /* no security */
                                            FALSE, /* auto-reset event */
                                            FALSE, /* non-signaled initially */
                                            NULL); /* unnamed */
  if (!cond->fallback.signal_event)
    goto error2;

  /* Create a manual-reset event. */
  cond->fallback.broadcast_event = CreateEvent(NULL,  /* no security */
                                               TRUE,  /* manual-reset */
                                               FALSE, /* non-signaled */
                                               NULL); /* unnamed */
  if (!cond->fallback.broadcast_event)
    goto error;

  return 0;

error:
  CloseHandle(cond->fallback.signal_event);
error2:
  DeleteCriticalSection(&cond->fallback.waiters_count_lock);
  return -1;
}


inline static int uv_cond_condvar_init(uv_cond_t* cond) {
  pInitializeConditionVariable(&cond->cond_var);
  return 0;
}


int uv_cond_init(uv_cond_t* cond) {
  uv__once_init();

  if (HAVE_CONDVAR_API())
    return uv_cond_condvar_init(cond);
  else
    return uv_cond_fallback_init(cond);
}


inline static void uv_cond_fallback_destroy(uv_cond_t* cond) {
  if (!CloseHandle(cond->fallback.broadcast_event))
    abort();
  if (!CloseHandle(cond->fallback.signal_event))
    abort();
  DeleteCriticalSection(&cond->fallback.waiters_count_lock);
}


inline static void uv_cond_condvar_destroy(uv_cond_t* cond) {
  /* nothing to do */
}


void uv_cond_destroy(uv_cond_t* cond) {
  if (HAVE_CONDVAR_API())
    uv_cond_condvar_destroy(cond);
  else
    uv_cond_fallback_destroy(cond);
}


inline static void uv_cond_fallback_signal(uv_cond_t* cond) {
  int have_waiters;

  /* Avoid race conditions. */
  EnterCriticalSection(&cond->fallback.waiters_count_lock);
  have_waiters = cond->fallback.waiters_count > 0;
  LeaveCriticalSection(&cond->fallback.waiters_count_lock);

  if (have_waiters)
    SetEvent(cond->fallback.signal_event);
}


inline static void uv_cond_condvar_signal(uv_cond_t* cond) {
  pWakeConditionVariable(&cond->cond_var);
}


void uv_cond_signal(uv_cond_t* cond) {
  if (HAVE_CONDVAR_API())
    uv_cond_condvar_signal(cond);
  else
    uv_cond_fallback_signal(cond);
}


inline static void uv_cond_fallback_broadcast(uv_cond_t* cond) {
  int have_waiters;

  /* Avoid race conditions. */
  EnterCriticalSection(&cond->fallback.waiters_count_lock);
  have_waiters = cond->fallback.waiters_count > 0;
  LeaveCriticalSection(&cond->fallback.waiters_count_lock);

  if (have_waiters)
    SetEvent(cond->fallback.broadcast_event);
}


inline static void uv_cond_condvar_broadcast(uv_cond_t* cond) {
  pWakeAllConditionVariable(&cond->cond_var);
}


void uv_cond_broadcast(uv_cond_t* cond) {
  if (HAVE_CONDVAR_API())
    uv_cond_condvar_broadcast(cond);
  else
    uv_cond_fallback_broadcast(cond);
}


inline int uv_cond_wait_helper(uv_cond_t* cond, uv_mutex_t* mutex,
    DWORD dwMilliseconds) {
  DWORD result;
  int last_waiter;
  HANDLE handles[2] = {
    cond->fallback.signal_event,
    cond->fallback.broadcast_event
  };

  /* Avoid race conditions. */
  EnterCriticalSection(&cond->fallback.waiters_count_lock);
  cond->fallback.waiters_count++;
  LeaveCriticalSection(&cond->fallback.waiters_count_lock);

  /* It's ok to release the <mutex> here since Win32 manual-reset events */
  /* maintain state when used with <SetEvent>. This avoids the "lost wakeup" */
  /* bug. */
  uv_mutex_unlock(mutex);

  /* Wait for either event to become signaled due to <uv_cond_signal> being */
  /* called or <uv_cond_broadcast> being called. */
  result = WaitForMultipleObjects(2, handles, FALSE, dwMilliseconds);

  EnterCriticalSection(&cond->fallback.waiters_count_lock);
  cond->fallback.waiters_count--;
  last_waiter = result == WAIT_OBJECT_0 + 1
      && cond->fallback.waiters_count == 0;
  LeaveCriticalSection(&cond->fallback.waiters_count_lock);

  /* Some thread called <pthread_cond_broadcast>. */
  if (last_waiter) {
    /* We're the last waiter to be notified or to stop waiting, so reset the */
    /* the manual-reset event. */
    ResetEvent(cond->fallback.broadcast_event);
  }

  /* Reacquire the <mutex>. */
  uv_mutex_lock(mutex);

  if (result == WAIT_OBJECT_0 || result == WAIT_OBJECT_0 + 1)
    return 0;

  if (result == WAIT_TIMEOUT)
    return -1;

  abort();
  return -1; /* Satisfy the compiler. */
}


inline static void uv_cond_fallback_wait(uv_cond_t* cond, uv_mutex_t* mutex) {
  if (uv_cond_wait_helper(cond, mutex, INFINITE))
    abort();
}


inline static void uv_cond_condvar_wait(uv_cond_t* cond, uv_mutex_t* mutex) {
  if (!pSleepConditionVariableCS(&cond->cond_var, mutex, INFINITE))
    abort();
}


void uv_cond_wait(uv_cond_t* cond, uv_mutex_t* mutex) {
  if (HAVE_CONDVAR_API())
    uv_cond_condvar_wait(cond, mutex);
  else
    uv_cond_fallback_wait(cond, mutex);
}


inline static int uv_cond_fallback_timedwait(uv_cond_t* cond,
    uv_mutex_t* mutex, uint64_t timeout) {
  return uv_cond_wait_helper(cond, mutex, (DWORD)(timeout / 1e6));
}


inline static int uv_cond_condvar_timedwait(uv_cond_t* cond,
    uv_mutex_t* mutex, uint64_t timeout) {
  if (pSleepConditionVariableCS(&cond->cond_var, mutex, (DWORD)(timeout / 1e6)))
    return 0;
  if (GetLastError() != ERROR_TIMEOUT)
    abort();
  return -1;
}


int uv_cond_timedwait(uv_cond_t* cond, uv_mutex_t* mutex,
    uint64_t timeout) {
  if (HAVE_CONDVAR_API())
    return uv_cond_condvar_timedwait(cond, mutex, timeout);
  else
    return uv_cond_fallback_timedwait(cond, mutex, timeout);
}

#else  /* UNIX */

unsigned long uv_thread_self(void) {
  return (unsigned long) pthread_self();
}


#if defined(__APPLE__) && defined(__MACH__)

int uv_cond_init(uv_cond_t* cond) {
  return -pthread_cond_init(cond, NULL);
}

#else /* !(defined(__APPLE__) && defined(__MACH__)) */

int uv_cond_init(uv_cond_t* cond) {
  pthread_condattr_t attr;
  int err;

  err = pthread_condattr_init(&attr);
  if (err)
    return -err;

#if !(defined(__ANDROID__) && defined(HAVE_PTHREAD_COND_TIMEDWAIT_MONOTONIC))
  err = pthread_condattr_setclock(&attr, CLOCK_MONOTONIC);
  if (err)
    goto error2;
#endif

  err = pthread_cond_init(cond, &attr);
  if (err)
    goto error2;

  err = pthread_condattr_destroy(&attr);
  if (err)
    goto error;

  return 0;

error:
  pthread_cond_destroy(cond);
error2:
  pthread_condattr_destroy(&attr);
  return -err;
}

#endif /* defined(__APPLE__) && defined(__MACH__) */

void uv_cond_destroy(uv_cond_t* cond) {
  if (pthread_cond_destroy(cond))
    abort();
}

void uv_cond_signal(uv_cond_t* cond) {
  if (pthread_cond_signal(cond))
    abort();
}

void uv_cond_broadcast(uv_cond_t* cond) {
  if (pthread_cond_broadcast(cond))
    abort();
}

void uv_cond_wait(uv_cond_t* cond, uv_mutex_t* mutex) {
  if (pthread_cond_wait(cond, mutex))
    abort();
}


int uv_cond_timedwait(uv_cond_t* cond, uv_mutex_t* mutex, uint64_t timeout) {
  int r;
  struct timespec ts;

#if defined(__APPLE__) && defined(__MACH__)
  ts.tv_sec = timeout / NANOSEC;
  ts.tv_nsec = timeout % NANOSEC;
  r = pthread_cond_timedwait_relative_np(cond, mutex, &ts);
#else
  timeout += uv__hrtime(UV_CLOCK_PRECISE);
  ts.tv_sec = timeout / NANOSEC;
  ts.tv_nsec = timeout % NANOSEC;
#if defined(__ANDROID__) && defined(HAVE_PTHREAD_COND_TIMEDWAIT_MONOTONIC)
  /*
   * The bionic pthread implementation doesn't support CLOCK_MONOTONIC,
   * but has this alternative function instead.
   */
  r = pthread_cond_timedwait_monotonic_np(cond, mutex, &ts);
#else
  r = pthread_cond_timedwait(cond, mutex, &ts);
#endif /* __ANDROID__ */
#endif


  if (r == 0)
    return 0;

  if (r == ETIMEDOUT)
    return -ETIMEDOUT;

  abort();
  return -EINVAL;  /* Satisfy the compiler. */
}

#endif  /* _WIN32 */

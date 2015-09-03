
#ifdef _WIN32
  typedef union {
    CONDITION_VARIABLE cond_var;
    struct {
      unsigned int waiters_count;
      CRITICAL_SECTION waiters_count_lock;
      HANDLE signal_event;
      HANDLE broadcast_event;
    } fallback;
  } uv_cond_t;

#else  /* UNIX */
  typedef pthread_cond_t uv_cond_t;
#endif

unsigned long uv_thread_self(void);

int uv_cond_init(uv_cond_t* cond);
void uv_cond_destroy(uv_cond_t* cond);
void uv_cond_signal(uv_cond_t* cond);
void uv_cond_broadcast(uv_cond_t* cond);
/* Waits on a condition variable without a timeout.
 *
 * Note:
 * 1. callers should be prepared to deal with spurious wakeups.
 */
void uv_cond_wait(uv_cond_t* cond, uv_mutex_t* mutex);
/* Waits on a condition variable with a timeout in nano seconds.
 * Returns 0 for success or -1 on timeout, * aborts when other errors happen.
 *
 * Note:
 * 1. callers should be prepared to deal with spurious wakeups.
 * 2. the granularity of timeout on Windows is never less than one millisecond.
 * 3. uv_cond_timedwait takes a relative timeout, not an absolute time.
 */
int uv_cond_timedwait(uv_cond_t* cond, uv_mutex_t* mutex,
    uint64_t timeout);

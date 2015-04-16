#include <limits.h>
#include <errno.h>
#define __STDC_LIMIT_MACROS true
#include <stdint.h>
#include <queue>

#include <dlfcn.h>
//#include <pthread.h> for win32 threading problems. are

/* define FFI_BUILDING before including ffi.h to workaround a libffi bug on Windows */
#define FFI_BUILDING
#include <ffi.h>

#include <uv.h>
#include <node_object_wrap.h>
#include <node.h>

#include <nan.h>

#if __OBJC__ || __OBJC2__
  #include <objc/objc.h>
#endif

#define THROW_ERROR_EXCEPTION(x) NanThrowError(x)
#define THROW_ERROR_EXCEPTION_WITH_STATUS_CODE(x, y) NanThrowError(x, y)

#define FFI_ASYNC_ERROR (ffi_status)1

using namespace v8;
using namespace node;

/*
 * Converts an arbitrary pointer to a node Buffer with 0-length
 */

Handle<Value> WrapPointer(char *);
Handle<Value> WrapPointer(char *, size_t length);

/*
 * Class used to store stuff during async ffi_call() invokations.
 */

class AsyncCallParams {
  public:
    ffi_status result;
    char *err;
    char *cif;
    char *fn;
    char *res;
    char *argv;
    NanCallback *callback;
};

class FFI {
  public:
    static void InitializeStaticFunctions(Handle<Object> Target);
    static void InitializeBindings(Handle<Object> Target);

  protected:
    static NAN_METHOD(FFIPrepCif);
    static NAN_METHOD(FFIPrepCifVar);
    static NAN_METHOD(FFICall);
    static NAN_METHOD(FFICallAsync);
    static void AsyncFFICall(uv_work_t *req);
    static void FinishAsyncFFICall(uv_work_t *req);

    static NAN_METHOD(Strtoul);
};


/*
 * One of these structs gets created for each `ffi.Callback()` invokation in
 * JavaScript-land. It contains all the necessary information when invoking the
 * pointer to proxy back to JS-land properly. It gets created by
 * `ffi_closure_alloc()`, and free'd in the closure_pointer_cb function.
 */

typedef struct _callback_info {
  ffi_closure closure;           // the actual `ffi_closure` instance get inlined
  void *code;                    // the executable function pointer
  NanCallback* errorFunction;    // JS callback function for reporting catched exceptions for the process' event loop
  NanCallback* function;         // JS callback function the closure represents
  // these two are required for creating proper sized WrapPointer buffer instances
  int argc;                      // the number of arguments this function expects
  size_t resultSize;             // the size of the result pointer
} callback_info;

class ThreadedCallbackInvokation;

class CallbackInfo {
  public:
    static void Initialize(Handle<Object> Target);
    static void WatcherCallback(uv_async_t *w, int revents);

  protected:
    static void DispatchToV8(callback_info *self, void *retval, void **parameters, bool dispatched = false);
    static void Invoke(ffi_cif *cif, void *retval, void **parameters, void *user_data);
    static NAN_METHOD(Callback);

  private:
#ifdef WIN32
    static DWORD g_threadID;
#else
    static uv_thread_t          g_mainthread;
#endif // WIN32
    static uv_mutex_t    g_queue_mutex;
    static std::queue<ThreadedCallbackInvokation *> g_queue;
    static uv_async_t         g_async;
};

/**
 *   Synchronization object to ensure following order of execution:
 *   -> WaitForExecution()     invoked
 *   -> SignalDoneExecuting()  returned
 *   -> WaitForExecution()     returned
 *
 *   ^WaitForExecution() must always be called from the thread which owns the object
 */

class ThreadedCallbackInvokation {
  public:
    ThreadedCallbackInvokation(callback_info *cbinfo, void *retval, void **parameters);
    ~ThreadedCallbackInvokation();

    void SignalDoneExecuting();
    void WaitForExecution();

    void *m_retval;
    void **m_parameters;
    callback_info *m_cbinfo;

  private:
    uv_cond_t m_cond;
    uv_mutex_t m_mutex;
};

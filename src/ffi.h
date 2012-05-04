#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <string.h>
#include <limits.h>
#include <errno.h>
#define __STDC_LIMIT_MACROS true
#include <stdint.h>
#include <queue>

#include <dlfcn.h>
#include <pthread.h>

#include <ffi.h>

#include <uv.h>
#include <node_object_wrap.h>
#include <node.h>

#if __OBJC__ || __OBJC2__
  #include <objc/objc.h>
#endif

#define THROW_ERROR_EXCEPTION(x) ThrowException(Exception::Error(String::New(x)))

using namespace v8;
using namespace node;

/*
 * Converts an arbitrary pointer to a node Buffer with 0-length
 */

Handle<Value> WrapPointer(char *);

class AsyncCallParams {
  public:
    ffi_cif *cif;
    void (*ptr)(void);
    void *res;
    void **args;
    Persistent<Object> emitter;
};

class FFI {
  public:
    static void InitializeStaticFunctions(Handle<Object> Target);
    static void InitializeBindings(Handle<Object> Target);

  protected:
    static Handle<Value> FFIPrepCif(const Arguments& args);
    static Handle<Value> Strtoul(const Arguments& args);
};

class ForeignCaller : public ObjectWrap {
  public:
    ForeignCaller();
    ~ForeignCaller();
    static void Initialize(Handle<Object> Target);

  protected:
    static Handle<Value> New(const Arguments& args);
    static Handle<Value> Exec(const Arguments& args);
    static void AsyncFFICall(uv_work_t *req);
    static void FinishAsyncFFICall(uv_work_t *req);

    ffi_cif *m_cif;
    void (*m_fn)(void);
    void *m_res;
    void **m_fnargs;

    bool m_async;

  private:
    static Persistent<FunctionTemplate> foreign_caller_template;
    static Handle<FunctionTemplate> MakeTemplate();
};

class ThreadedCallbackInvokation;

class CallbackInfo : public ObjectWrap {
  public:
    CallbackInfo(Handle<Function> func, void *closure, void *code);
    ~CallbackInfo();
    static void Initialize(Handle<Object> Target);
    Handle<Value> GetPointerObject();
    static void WatcherCallback(uv_async_t *w, int revents);

  protected:
    static void DispatchToV8(CallbackInfo *self, void *retval, void **parameters);
    static Handle<Value> New(const Arguments& args);
    static Handle<Value> GetPointer(Local<String> name, const AccessorInfo& info);
    static void Invoke(ffi_cif *cif, void *retval, void **parameters, void *user_data);

  private:
    static Persistent<FunctionTemplate> callback_template;
    static Handle<FunctionTemplate> MakeTemplate();

    static pthread_t        g_mainthread;
    static pthread_mutex_t  g_queue_mutex;
    static std::queue<ThreadedCallbackInvokation *> g_queue;
    static uv_async_t         g_async;

    void                    *m_closure;
    void                    *code;
    Persistent<Function>    m_function;
    Handle<Object>          m_this;
};

class ThreadedCallbackInvokation {
  public:
    ThreadedCallbackInvokation(CallbackInfo *cbinfo, void *retval, void **parameters);
    ~ThreadedCallbackInvokation();

    void SignalDoneExecuting();
    void WaitForExecution();

    void *m_retval;
    void **m_parameters;
    CallbackInfo *m_cbinfo;

  private:
    pthread_cond_t m_cond;
    pthread_mutex_t m_mutex;
};

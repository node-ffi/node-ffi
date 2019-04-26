// https://raw.githubusercontent.com/ghostoy/node-ffi/master/src/callback_info.cc
// Reference:
//   http://www.bufferoverflow.ch/cgi-bin/dwww/usr/share/doc/libffi5/html/The-Closure-API.html

#include <node.h>
#include <node_buffer.h>
#include <node_version.h>
#include "ffi.h"

#if !(NODE_VERSION_AT_LEAST(0, 11, 15))
  #ifdef WIN32
    int uv_thread_equal(const uv_thread_t* t1, const uv_thread_t* t2) {
      return *t1 == *t2;
    }
  #else
    #include <pthread.h>
    int uv_thread_equal(const uv_thread_t* t1, const uv_thread_t* t2) {
      return pthread_equal(*t1, *t2);
    }
  #endif
#endif

#ifdef WIN32
DWORD CallbackInfo::g_threadID;
#else
uv_thread_t CallbackInfo::g_mainthread;
#endif
uv_mutex_t    CallbackInfo::g_queue_mutex;
std::queue<ThreadedCallbackInvokation *> CallbackInfo::g_queue;
uv_async_t         CallbackInfo::g_async;

/*
 * Called when the `ffi_closure *` pointer (actually the "code" pointer) get's
 * GC'd on the JavaScript side. In this case we have to unwrap the
 * `callback_info *` struct, dispose of the JS function Persistent reference,
 * then finally free the struct.
 */

void closure_pointer_cb(char *data, void *hint) {
  callback_info *info = reinterpret_cast<callback_info *>(hint);
  // dispose of the Persistent function reference
  delete info->function;
  info->function = NULL;
  // now we can free the closure data
  ffi_closure_free(info);
}

/*
 * Invokes the JS callback function.
 */

void CallbackInfo::DispatchToV8(callback_info *info, void *retval, void **parameters, bool dispatched) {
  Nan::HandleScope scope;

  static const char* errorMessage = "ffi fatal: callback has been garbage collected!";

  if (info->function == NULL) {
    // throw an error instead of segfaulting.
    // see: https://github.com/rbranson/node-ffi/issues/72
    if (dispatched) {
        Local<Value> errorFunctionArgv[1];
        errorFunctionArgv[0] = Nan::New<String>(errorMessage).ToLocalChecked();
        info->errorFunction->Call(1, errorFunctionArgv);
    }
    else {
      Nan::ThrowError(errorMessage);
    }
  } else {
    // invoke the registered callback function
    Local<Value> functionArgv[2];
    functionArgv[0] = WrapPointer((char *)retval, info->resultSize);
    functionArgv[1] = WrapPointer((char *)parameters, sizeof(char *) * info->argc);
    Local<Value> e = info->function->Call(2, functionArgv);
    if (!e->IsUndefined()) {
      if (dispatched) {
        Local<Value> errorFunctionArgv[1];
        errorFunctionArgv[0] = e;
        info->errorFunction->Call(1, errorFunctionArgv);
      } else {
        Nan::ThrowError(e);
      }
    }
  }
}

void CallbackInfo::WatcherCallback(uv_async_t *w, int revents) {
  uv_mutex_lock(&g_queue_mutex);

  while (!g_queue.empty()) {
    ThreadedCallbackInvokation *inv = g_queue.front();
    g_queue.pop();

    DispatchToV8(inv->m_cbinfo, inv->m_retval, inv->m_parameters, true);
    inv->SignalDoneExecuting();
  }

  uv_mutex_unlock(&g_queue_mutex);
}

/*
 * Creates an `ffi_closure *` pointer around the given JS function. Returns the
 * executable C function pointer as a node Buffer instance.
 */

NAN_METHOD(CallbackInfo::Callback) {
  if (info.Length() != 5) {
    return THROW_ERROR_EXCEPTION("Not enough arguments.");
  }

  // Args: cif pointer, JS function
  // TODO: Check args
  auto context = v8::Isolate::GetCurrent()->GetCurrentContext();
  ffi_cif *cif = (ffi_cif *)Buffer::Data(info[0]->ToObject(context).ToLocalChecked());
  size_t resultSize = info[1]->Int32Value(context).ToChecked();
  int argc = info[2]->Int32Value(context).ToChecked();
  Local<Function> errorReportCallback = Local<Function>::Cast(info[3]);
  Local<Function> callback = Local<Function>::Cast(info[4]);

  callback_info *cbInfo;
  ffi_status status;
  void *code;

  cbInfo = reinterpret_cast<callback_info *>(ffi_closure_alloc(sizeof(callback_info), &code));

  if (!cbInfo) {
    return THROW_ERROR_EXCEPTION("ffi_closure_alloc() Returned Error");
  }

  cbInfo->resultSize = resultSize;
  cbInfo->argc = argc;
  cbInfo->errorFunction = new Nan::Callback(errorReportCallback);
  cbInfo->function = new Nan::Callback(callback);

  // store a reference to the callback function pointer
  // (not sure if this is actually needed...)
  cbInfo->code = code;

  //CallbackInfo *self = new CallbackInfo(callback, closure, code, argc);

  status = ffi_prep_closure_loc(
    (ffi_closure *)cbInfo,
    cif,
    Invoke,
    (void *)cbInfo,
    code
  );

  if (status != FFI_OK) {
    ffi_closure_free(cbInfo);
    return THROW_ERROR_EXCEPTION_WITH_STATUS_CODE("ffi_prep_closure() Returned Error", status);
  }

  info.GetReturnValue().Set(
    Nan::NewBuffer((char *)code, sizeof(void*), closure_pointer_cb, cbInfo).ToLocalChecked()
  );
}

/*
 * This is the function that gets called when the C function pointer gets
 * executed.
 */

void CallbackInfo::Invoke(ffi_cif *cif, void *retval, void **parameters, void *user_data) {
  callback_info *info = reinterpret_cast<callback_info *>(user_data);

  // are we executing from another thread?
#ifdef WIN32
  if (g_threadID == GetCurrentThreadId()) {
#else
  uv_thread_t self_thread = (uv_thread_t) uv_thread_self();
  if (uv_thread_equal(&self_thread, &g_mainthread)) {
#endif
    DispatchToV8(info, retval, parameters);
  } else {
    // hold the event loop open while this is executing
#if NODE_VERSION_AT_LEAST(0, 7, 9)
    uv_ref((uv_handle_t *)&g_async);
#else
    uv_ref(uv_default_loop());
#endif

    // create a temporary storage area for our invokation parameters
    ThreadedCallbackInvokation *inv = new ThreadedCallbackInvokation(info, retval, parameters);

    // push it to the queue -- threadsafe
    uv_mutex_lock(&g_queue_mutex);
    g_queue.push(inv);
    uv_mutex_unlock(&g_queue_mutex);

    // send a message to our main thread to wake up the WatchCallback loop
    uv_async_send(&g_async);

    // wait for signal from calling thread
    inv->WaitForExecution();

#if NODE_VERSION_AT_LEAST(0, 7, 9)
    uv_unref((uv_handle_t *)&g_async);
#else
    uv_unref(uv_default_loop());
#endif
    delete inv;
  }
}

/*
 * Init stuff.
 */

void CallbackInfo::Initialize(v8::Local<Object> target) {
  Nan::HandleScope scope;

  auto context = v8::Isolate::GetCurrent()->GetCurrentContext();
	Nan::Set(target,
    Nan::New<String>("Callback").ToLocalChecked(),
		Nan::New<FunctionTemplate>(Callback)->GetFunction(context).ToLocalChecked());

  // initialize our threaded invokation stuff
#ifdef WIN32
  g_threadID = GetCurrentThreadId();
#else
  g_mainthread = (uv_thread_t) uv_thread_self();
#endif
  uv_async_init(uv_default_loop(), &g_async, (uv_async_cb) CallbackInfo::WatcherCallback);
  uv_mutex_init(&g_queue_mutex);

  // allow the event loop to exit while this is running
#if NODE_VERSION_AT_LEAST(0, 7, 9)
  uv_unref((uv_handle_t *)&g_async);
#else
  uv_unref(uv_default_loop());
#endif
}

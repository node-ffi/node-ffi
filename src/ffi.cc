#include <node.h>
#include <node_buffer.h>
#include "ffi.h"
#include "fficonfig.h"

/*
 * Called when the wrapped pointer is garbage collected.
 * We never have to do anything here...
 */

void wrap_pointer_cb(char *data, void *hint) {
  //fprintf(stderr, "wrap_pointer_cb\n");
}

int node_ffi_errno() {
    return errno;
}

///////////////

NAN_MODULE_INIT(FFI::InitializeStaticFunctions) {
  Local<Object> o = Nan::New<Object>();

  // dl functions used by the DynamicLibrary JS class
  o->Set(Nan::New<String>("dlopen").ToLocalChecked(),  WrapPointer((char *)dlopen));
  o->Set(Nan::New<String>("dlclose").ToLocalChecked(), WrapPointer((char *)dlclose));
  o->Set(Nan::New<String>("dlsym").ToLocalChecked(),   WrapPointer((char *)dlsym));
  o->Set(Nan::New<String>("dlerror").ToLocalChecked(), WrapPointer((char *)dlerror));

  o->Set(Nan::New<String>("_errno").ToLocalChecked(), WrapPointer((char *)node_ffi_errno));

  target->Set(Nan::New<String>("StaticFunctions").ToLocalChecked(), o);
}

///////////////

#define SET_ENUM_VALUE(_value) \
  Nan::ForceSet(target, Nan::New<String>(#_value).ToLocalChecked(), \
  Nan::New<Integer>((uint32_t)_value), \
  static_cast<PropertyAttribute>(ReadOnly|DontDelete))

NAN_MODULE_INIT(FFI::InitializeBindings) {

  Nan::Set(target, Nan::New<String>("version").ToLocalChecked(),
    Nan::New<String>(PACKAGE_VERSION).ToLocalChecked());

  auto context = v8::Isolate::GetCurrent()->GetCurrentContext();

  // main function exports
  Nan::Set(target, Nan::New<String>("ffi_prep_cif").ToLocalChecked(),
    Nan::New<FunctionTemplate>(FFIPrepCif)->GetFunction(context).ToLocalChecked());
  Nan::Set(target, Nan::New<String>("ffi_prep_cif_var").ToLocalChecked(),
    Nan::New<FunctionTemplate>(FFIPrepCifVar)->GetFunction(context).ToLocalChecked());
  Nan::Set(target, Nan::New<String>("ffi_call").ToLocalChecked(),
    Nan::New<FunctionTemplate>(FFICall)->GetFunction(context).ToLocalChecked());
  Nan::Set(target, Nan::New<String>("ffi_call_async").ToLocalChecked(),
    Nan::New<FunctionTemplate>(FFICallAsync)->GetFunction(context).ToLocalChecked());

  // `ffi_status` enum values
  SET_ENUM_VALUE(FFI_OK);
  SET_ENUM_VALUE(FFI_BAD_TYPEDEF);
  SET_ENUM_VALUE(FFI_BAD_ABI);

  // `ffi_abi` enum values
  SET_ENUM_VALUE(FFI_DEFAULT_ABI);
  SET_ENUM_VALUE(FFI_FIRST_ABI);
  SET_ENUM_VALUE(FFI_LAST_ABI);
  /* ---- ARM processors ---------- */
#ifdef __arm__
  SET_ENUM_VALUE(FFI_SYSV);
  SET_ENUM_VALUE(FFI_VFP);
  /* ---- Intel x86 Win32 ---------- */
#elif defined(X86_WIN32)
  SET_ENUM_VALUE(FFI_SYSV);
  SET_ENUM_VALUE(FFI_STDCALL);
  SET_ENUM_VALUE(FFI_THISCALL);
  SET_ENUM_VALUE(FFI_FASTCALL);
  SET_ENUM_VALUE(FFI_MS_CDECL);
#elif defined(X86_WIN64)
  SET_ENUM_VALUE(FFI_WIN64);
#else
  /* ---- Intel x86 and AMD x86-64 - */
  SET_ENUM_VALUE(FFI_SYSV);
  /* Unix variants all use the same ABI for x86-64  */
  SET_ENUM_VALUE(FFI_UNIX64);
#endif

  /* flags for dlopen() */
#ifdef RTLD_LAZY
  SET_ENUM_VALUE(RTLD_LAZY);
#endif
#ifdef RTLD_NOW
  SET_ENUM_VALUE(RTLD_NOW);
#endif
#ifdef RTLD_LOCAL
  SET_ENUM_VALUE(RTLD_LOCAL);
#endif
#ifdef RTLD_GLOBAL
  SET_ENUM_VALUE(RTLD_GLOBAL);
#endif
#ifdef RTLD_NOLOAD
  SET_ENUM_VALUE(RTLD_NOLOAD);
#endif
#ifdef RTLD_NODELETE
  SET_ENUM_VALUE(RTLD_NODELETE);
#endif
#ifdef RTLD_FIRST
  SET_ENUM_VALUE(RTLD_FIRST);
#endif

  /* flags for dlsym() */
#ifdef RTLD_NEXT
  Nan::ForceSet(target,Nan::New<String>("RTLD_NEXT").ToLocalChecked(), WrapPointer((char *)RTLD_NEXT), static_cast<PropertyAttribute>(ReadOnly | DontDelete));
#endif
#ifdef RTLD_DEFAULT
  Nan::ForceSet(target,Nan::New<String>("RTLD_DEFAULT").ToLocalChecked(), WrapPointer((char *)RTLD_DEFAULT), static_cast<PropertyAttribute>(ReadOnly | DontDelete));
#endif
#ifdef RTLD_SELF
  Nan::ForceSet(target,Nan::New<String>("RTLD_SELF").ToLocalChecked(), WrapPointer((char *)RTLD_SELF), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
#endif
#ifdef RTLD_MAIN_ONLY
  Nan::ForceSet(target,Nan::New<String>("RTLD_MAIN_ONLY").ToLocalChecked(), WrapPointer((char *)RTLD_MAIN_ONLY), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
#endif

  Nan::ForceSet(target,Nan::New<String>("FFI_ARG_SIZE").ToLocalChecked(), Nan::New<Uint32>((uint32_t)sizeof(ffi_arg)), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
  Nan::ForceSet(target,Nan::New<String>("FFI_SARG_SIZE").ToLocalChecked(), Nan::New<Uint32>((uint32_t)sizeof(ffi_sarg)), static_cast<PropertyAttribute>(ReadOnly | DontDelete));
  Nan::ForceSet(target,Nan::New<String>("FFI_TYPE_SIZE").ToLocalChecked(), Nan::New<Uint32>((uint32_t)sizeof(ffi_type)), static_cast<PropertyAttribute>(ReadOnly | DontDelete));
  Nan::ForceSet(target,Nan::New<String>("FFI_CIF_SIZE").ToLocalChecked(), Nan::New<Uint32>((uint32_t)sizeof(ffi_cif)), static_cast<PropertyAttribute>(ReadOnly | DontDelete));

  bool hasObjc = false;
#if __OBJC__ || __OBJC2__
  hasObjc = true;
#endif
  Nan::ForceSet(target,Nan::New<String>("HAS_OBJC").ToLocalChecked(), Nan::New<Boolean>(hasObjc), static_cast<PropertyAttribute>(ReadOnly | DontDelete));

  Local<Object> ftmap = Nan::New<Object>();
  ftmap->Set(Nan::New<String>("void").ToLocalChecked(), WrapPointer((char *)&ffi_type_void));
  ftmap->Set(Nan::New<String>("uint8").ToLocalChecked(), WrapPointer((char *)&ffi_type_uint8));
  ftmap->Set(Nan::New<String>("int8").ToLocalChecked(), WrapPointer((char *)&ffi_type_sint8));
  ftmap->Set(Nan::New<String>("uint16").ToLocalChecked(), WrapPointer((char *)&ffi_type_uint16));
  ftmap->Set(Nan::New<String>("int16").ToLocalChecked(), WrapPointer((char *)&ffi_type_sint16));
  ftmap->Set(Nan::New<String>("uint32").ToLocalChecked(), WrapPointer((char *)&ffi_type_uint32));
  ftmap->Set(Nan::New<String>("int32").ToLocalChecked(), WrapPointer((char *)&ffi_type_sint32));
  ftmap->Set(Nan::New<String>("uint64").ToLocalChecked(), WrapPointer((char *)&ffi_type_uint64));
  ftmap->Set(Nan::New<String>("int64").ToLocalChecked(), WrapPointer((char *)&ffi_type_sint64));
  ftmap->Set(Nan::New<String>("uchar").ToLocalChecked(), WrapPointer((char *)&ffi_type_uchar));
  ftmap->Set(Nan::New<String>("char").ToLocalChecked(), WrapPointer((char *)&ffi_type_schar));
  ftmap->Set(Nan::New<String>("ushort").ToLocalChecked(), WrapPointer((char *)&ffi_type_ushort));
  ftmap->Set(Nan::New<String>("short").ToLocalChecked(), WrapPointer((char *)&ffi_type_sshort));
  ftmap->Set(Nan::New<String>("uint").ToLocalChecked(), WrapPointer((char *)&ffi_type_uint));
  ftmap->Set(Nan::New<String>("int").ToLocalChecked(), WrapPointer((char *)&ffi_type_sint));
  ftmap->Set(Nan::New<String>("float").ToLocalChecked(), WrapPointer((char *)&ffi_type_float));
  ftmap->Set(Nan::New<String>("double").ToLocalChecked(), WrapPointer((char *)&ffi_type_double));
  ftmap->Set(Nan::New<String>("pointer").ToLocalChecked(), WrapPointer((char *)&ffi_type_pointer));
  // NOTE: "long" and "ulong" get Locald in JS-land
  // Let libffi Local "long long"
  ftmap->Set(Nan::New<String>("ulonglong").ToLocalChecked(), WrapPointer((char *)&ffi_type_ulong));
  ftmap->Set(Nan::New<String>("longlong").ToLocalChecked(), WrapPointer((char *)&ffi_type_slong));

  target->Set(Nan::New<String>("FFI_TYPES").ToLocalChecked(), ftmap);
}

/*
 * Function that creates and returns an `ffi_cif` pointer from the given return
 * value type and argument types.
 *
 * args[0] - the CIF buffer
 * args[1] - the number of args
 * args[2] - the "return type" pointer
 * args[3] - the "arguments types array" pointer
 * args[4] - the ABI to use
 *
 * returns the ffi_status result from ffi_prep_cif()
 */

NAN_METHOD(FFI::FFIPrepCif) {
  unsigned int nargs;
  char *rtype, *atypes, *cif;
  ffi_status status;
  ffi_abi abi;

  if (info.Length() != 5) {
    return THROW_ERROR_EXCEPTION("ffi_prep_cif() requires 5 arguments!");
  }

  Local<Value> cif_buf = info[0];
  if (!Buffer::HasInstance(cif_buf)) {
    return THROW_ERROR_EXCEPTION("prepCif(): Buffer required as first arg");
  }

  auto context = v8::Isolate::GetCurrent()->GetCurrentContext();
  cif = Buffer::Data(cif_buf.As<Object>());
  nargs = info[1]->Uint32Value(context).ToChecked();
  rtype = Buffer::Data(info[2]->ToObject(context).ToLocalChecked());
  atypes = Buffer::Data(info[3]->ToObject(context).ToLocalChecked());
  abi = (ffi_abi)info[4]->Uint32Value(context).ToChecked();

  status = ffi_prep_cif(
      (ffi_cif *)cif,
      abi,
      nargs,
      (ffi_type *)rtype,
      (ffi_type **)atypes);

  info.GetReturnValue().Set(Nan::New<Integer>(status));
}

/*
 * Function that creates and returns an `ffi_cif` pointer from the given return
 * value type and argument types.
 *
 * args[0] - the CIF buffer
 * args[1] - the number of fixed args
 * args[2] - the number of total args
 * args[3] - the "return type" pointer
 * args[4] - the "arguments types array" pointer
 * args[5] - the ABI to use
 *
 * returns the ffi_status result from ffi_prep_cif_var()
 */
NAN_METHOD(FFI::FFIPrepCifVar) {
  unsigned int fargs, targs;
  char *rtype, *atypes, *cif;
  ffi_status status;
  ffi_abi abi;

  if (info.Length() != 6) {
    return THROW_ERROR_EXCEPTION("ffi_prep_cif() requires 5 arguments!");
  }

  Local<Value> cif_buf = info[0];
  if (!Buffer::HasInstance(cif_buf)) {
    return THROW_ERROR_EXCEPTION("prepCifVar(): Buffer required as first arg");
  }

  cif = Buffer::Data(cif_buf.As<Object>());

  auto context = v8::Isolate::GetCurrent()->GetCurrentContext();
  fargs = info[1]->Uint32Value(context).ToChecked();
  targs = info[2]->Uint32Value(context).ToChecked();
  rtype = Buffer::Data(info[3]->ToObject(context).ToLocalChecked());
  atypes = Buffer::Data(info[4]->ToObject(context).ToLocalChecked());
  abi = (ffi_abi)info[5]->Uint32Value(context).ToChecked();

  status = ffi_prep_cif_var(
      (ffi_cif *)cif,
      abi,
      fargs,
      targs,
      (ffi_type *)rtype,
      (ffi_type **)atypes);

  info.GetReturnValue().Set(Nan::New<Integer>(status));
}

/*
 * JS wrapper around `ffi_call()`.
 *
 * args[0] - Buffer - the `ffi_cif *`
 * args[1] - Buffer - the C function pointer to invoke
 * args[2] - Buffer - the `void *` buffer big enough to hold the return value
 * args[3] - Buffer - the `void **` array of pointers containing the arguments
 */

NAN_METHOD(FFI::FFICall) {
  if (info.Length() != 4) {
    return THROW_ERROR_EXCEPTION("ffi_call() requires 4 arguments!");
  }

  auto context = v8::Isolate::GetCurrent()->GetCurrentContext();
  char *cif = Buffer::Data(info[0]->ToObject(context).ToLocalChecked());
  char *fn = Buffer::Data(info[1]->ToObject(context).ToLocalChecked());
  char *res = Buffer::Data(info[2]->ToObject(context).ToLocalChecked());
  char *fnargs = Buffer::Data(info[3]->ToObject(context).ToLocalChecked());

#if __OBJC__ || __OBJC2__
    @try {
#endif
      ffi_call(
          (ffi_cif *)cif,
          FFI_FN(fn),
          (void *)res,
          (void **)fnargs
        );
#if __OBJC__ || __OBJC2__
    } @catch (id ex) {
      return THROW_ERROR_EXCEPTION(WrapPointer((char *)ex));
    }
#endif

  info.GetReturnValue().SetUndefined();
}

/*
 * Asynchronous JS wrapper around `ffi_call()`.
 *
 * args[0] - Buffer - the `ffi_cif *`
 * args[1] - Buffer - the C function pointer to invoke
 * args[2] - Buffer - the `void *` buffer big enough to hold the return value
 * args[3] - Buffer - the `void **` array of pointers containing the arguments
 * args[4] - Function - the callback function to invoke when complete
 */

NAN_METHOD(FFI::FFICallAsync) {
  if (info.Length() != 5) {
    return THROW_ERROR_EXCEPTION("ffi_call_async() requires 5 arguments!");
  }

  AsyncCallParams *p = new AsyncCallParams();
  p->result = FFI_OK;

  // store a persistent references to all the Buffers and the callback function
  auto context = v8::Isolate::GetCurrent()->GetCurrentContext();
  p->cif = Buffer::Data(info[0]->ToObject(context).ToLocalChecked());
  p->fn = Buffer::Data(info[1]->ToObject(context).ToLocalChecked());
  p->res = Buffer::Data(info[2]->ToObject(context).ToLocalChecked());
  p->argv = Buffer::Data(info[3]->ToObject(context).ToLocalChecked());

  Local<Function> callback = Local<Function>::Cast(info[4]);
  p->callback = new Nan::Callback(callback);

  uv_work_t *req = new uv_work_t;
  req->data = p;

  uv_queue_work(uv_default_loop(), req,
      FFI::AsyncFFICall,
      (uv_after_work_cb)FFI::FinishAsyncFFICall);

  info.GetReturnValue().SetUndefined();
}

/*
 * Called on the thread pool.
 */
void FFI::AsyncFFICall(uv_work_t *req) {
  AsyncCallParams *p = (AsyncCallParams *)req->data;

#if __OBJC__ || __OBJC2__
  @try {
#endif
    ffi_call(
      (ffi_cif *)p->cif,
      FFI_FN(p->fn),
      (void *)p->res,
      (void **)p->argv
    );
#if __OBJC__ || __OBJC2__
  } @catch (id ex) {
    p->result = FFI_ASYNC_ERROR;
    p->err = (char *)ex;
  }
#endif
}

/*
 * Called after the AsyncFFICall function completes on the thread pool.
 * This gets run on the main loop thread.
 */

void FFI::FinishAsyncFFICall(uv_work_t *req) {
  Nan::HandleScope scope;

  AsyncCallParams *p = (AsyncCallParams *)req->data;

  Local<Value> argv[] = { Nan::Null() };
  if (p->result != FFI_OK) {
    // an Objective-C error was thrown
    argv[0] = WrapPointer(p->err);
  }

  Nan::TryCatch try_catch;

  // invoke the registered callback function
  p->callback->Call(1, argv);

  // dispose of our persistent Local to the callback function
  delete p->callback;

  // free up our memory (allocated in FFICallAsync)
  delete p;
  delete req;

  if (try_catch.HasCaught()) {
#if NODE_VERSION_AT_LEAST(0, 12, 0)
    Nan::FatalException(try_catch);
#else
    FatalException(try_catch);
#endif
  }
}

NAN_MODULE_INIT(init) {
  Nan::HandleScope scope;

  FFI::InitializeBindings(target);
  FFI::InitializeStaticFunctions(target);
  CallbackInfo::Initialize(target);
}

NODE_MODULE(ffi_bindings, init)

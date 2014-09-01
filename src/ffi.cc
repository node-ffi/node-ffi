#include <node_buffer.h>
#include "ffi.h"

/*
 * Called when the wrapped pointer is garbage collected.
 * We never have to do anything here...
 */

void wrap_pointer_cb(char *data, void *hint) {
  //fprintf(stderr, "wrap_pointer_cb\n");
}

Handle<Value> WrapPointer(char *ptr) {
  size_t size = 0;
  return WrapPointer(ptr, size);
}

Handle<Value> WrapPointer(char *ptr, size_t length) {
  NanEscapableScope();
  void *user_data = NULL;
  Local<Object> buf = NanNewBufferHandle(ptr, length, wrap_pointer_cb, user_data);  
  return NanEscapeScope(buf);
}

///////////////

void FFI::InitializeStaticFunctions(Handle<Object> target) {
  Local<Object> o = NanNew<Object>();

  // dl functions used by the DynamicLibrary JS class
  o->Set(NanNew("dlopen"),  WrapPointer((char *)dlopen));
  o->Set(NanNew("dlclose"), WrapPointer((char *)dlclose));
  o->Set(NanNew("dlsym"),   WrapPointer((char *)dlsym));
  o->Set(NanNew("dlerror"), WrapPointer((char *)dlerror));

  target->Set(NanNew("StaticFunctions"), o);
}

///////////////

#define SET_ENUM_VALUE(_value) \
  target->Set(NanNew<String>(#_value), \
              NanNew<Number>((ssize_t)_value), \
              static_cast<PropertyAttribute>(ReadOnly|DontDelete))

void FFI::InitializeBindings(Handle<Object> target) {

  // main function exports
  NODE_SET_METHOD(target, "ffi_prep_cif", FFIPrepCif);
  NODE_SET_METHOD(target, "ffi_prep_cif_var", FFIPrepCifVar);
  NODE_SET_METHOD(target, "ffi_call", FFICall);
  NODE_SET_METHOD(target, "ffi_call_async", FFICallAsync);

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
  target->Set(NanNew("RTLD_NEXT"), WrapPointer((char *)RTLD_NEXT), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
#endif
#ifdef RTLD_DEFAULT
  target->Set(NanNew("RTLD_DEFAULT"), WrapPointer((char *)RTLD_DEFAULT), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
#endif
#ifdef RTLD_SELF
  target->Set(NanNew("RTLD_SELF"), WrapPointer((char *)RTLD_SELF), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
#endif
#ifdef RTLD_MAIN_ONLY
  target->Set(NanNew("RTLD_MAIN_ONLY"), WrapPointer((char *)RTLD_MAIN_ONLY), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
#endif

  target->Set(NanNew("FFI_ARG_SIZE"), NanNew<Number>(sizeof(ffi_arg)), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
  target->Set(NanNew("FFI_SARG_SIZE"), NanNew<Number>(sizeof(ffi_sarg)), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
  target->Set(NanNew("FFI_TYPE_SIZE"), NanNew<Number>(sizeof(ffi_type)), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
  target->Set(NanNew("FFI_CIF_SIZE"), NanNew<Number>(sizeof(ffi_cif)), static_cast<PropertyAttribute>(ReadOnly|DontDelete));

  bool hasObjc = false;
#if __OBJC__ || __OBJC2__
  hasObjc = true;
#endif
  target->Set(NanNew("HAS_OBJC"), NanNew<Boolean>(hasObjc), static_cast<PropertyAttribute>(ReadOnly|DontDelete));

  Local<Object> ftmap = NanNew<Object>();
  ftmap->Set(NanNew("void"),     WrapPointer((char *)&ffi_type_void));
  ftmap->Set(NanNew("uint8"),    WrapPointer((char *)&ffi_type_uint8));
  ftmap->Set(NanNew("int8"),     WrapPointer((char *)&ffi_type_sint8));
  ftmap->Set(NanNew("uint16"),   WrapPointer((char *)&ffi_type_uint16));
  ftmap->Set(NanNew("int16"),    WrapPointer((char *)&ffi_type_sint16));
  ftmap->Set(NanNew("uint32"),   WrapPointer((char *)&ffi_type_uint32));
  ftmap->Set(NanNew("int32"),    WrapPointer((char *)&ffi_type_sint32));
  ftmap->Set(NanNew("uint64"),   WrapPointer((char *)&ffi_type_uint64));
  ftmap->Set(NanNew("int64"),    WrapPointer((char *)&ffi_type_sint64));
  ftmap->Set(NanNew("uchar"),    WrapPointer((char *)&ffi_type_uchar));
  ftmap->Set(NanNew("char"),     WrapPointer((char *)&ffi_type_schar));
  ftmap->Set(NanNew("ushort"),   WrapPointer((char *)&ffi_type_ushort));
  ftmap->Set(NanNew("short"),    WrapPointer((char *)&ffi_type_sshort));
  ftmap->Set(NanNew("uint"),     WrapPointer((char *)&ffi_type_uint));
  ftmap->Set(NanNew("int"),      WrapPointer((char *)&ffi_type_sint));
  ftmap->Set(NanNew("float"),    WrapPointer((char *)&ffi_type_float));
  ftmap->Set(NanNew("double"),   WrapPointer((char *)&ffi_type_double));
  ftmap->Set(NanNew("pointer"),  WrapPointer((char *)&ffi_type_pointer));
  // NOTE: "long" and "ulong" get handled in JS-land
  // Let libffi handle "long long"
  ftmap->Set(NanNew("ulonglong"), WrapPointer((char *)&ffi_type_ulong));
  ftmap->Set(NanNew("longlong"),  WrapPointer((char *)&ffi_type_slong));

  target->Set(NanNew("FFI_TYPES"), ftmap);
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
  NanScope();

  unsigned int nargs;
  char *rtype, *atypes, *cif;
  ffi_status status;
  ffi_abi abi;

  if (args.Length() != 5) {
    return NanThrowError("ffi_prep_cif() requires 5 arguments!");
  }

  Handle<Value> cif_buf = args[0];
  if (!Buffer::HasInstance(cif_buf)) {
    return NanThrowError("prepCif(): Buffer required as first arg");
  }

  cif = Buffer::Data(cif_buf.As<Object>());
  nargs = args[1]->Uint32Value();
  rtype = Buffer::Data(args[2]->ToObject());
  atypes = Buffer::Data(args[3]->ToObject());
  abi = (ffi_abi)args[4]->Uint32Value();

  status = ffi_prep_cif(
      (ffi_cif *)cif,
      abi,
      nargs,
      (ffi_type *)rtype,
      (ffi_type **)atypes);

  NanReturnValue(NanNew<Number>(status));
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
  NanScope();

  unsigned int fargs, targs;
  char *rtype, *atypes, *cif;
  ffi_status status;
  ffi_abi abi;

  if (args.Length() != 6) {
    return NanThrowError("ffi_prep_cif() requires 5 arguments!");
  }

  Handle<Value> cif_buf = args[0];
  if (!Buffer::HasInstance(cif_buf)) {
    return NanThrowError("prepCifVar(): Buffer required as first arg");
  }

  cif = Buffer::Data(cif_buf.As<Object>());
  fargs = args[1]->Uint32Value();
  targs = args[2]->Uint32Value();
  rtype = Buffer::Data(args[3]->ToObject());
  atypes = Buffer::Data(args[4]->ToObject());
  abi = (ffi_abi)args[5]->Uint32Value();

  status = ffi_prep_cif_var(
      (ffi_cif *)cif,
      abi,
      fargs,
      targs,
      (ffi_type *)rtype,
      (ffi_type **)atypes);

  NanReturnValue(NanNew<Number>(status));
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
  NanScope();

  if (args.Length() != 4) {
    return NanThrowError("ffi_call() requires 4 arguments!");
  }

  char *cif    = Buffer::Data(args[0]->ToObject());
  char *fn     = Buffer::Data(args[1]->ToObject());
  char *res    = Buffer::Data(args[2]->ToObject());
  char *fnargs = Buffer::Data(args[3]->ToObject());

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
      return NanThrowError(WrapPointer((char *)ex));
    }
#endif

  NanReturnUndefined();
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
  NanScope();

  if (args.Length() != 5) {
    return NanThrowError("ffi_call_async() requires 5 arguments!");
  }

  AsyncCallParams *p = new AsyncCallParams();
  p->result = FFI_OK;

  // store a persistent references to all the Buffers and the callback function
  p->cif  = Buffer::Data(args[0]->ToObject());
  p->fn   = Buffer::Data(args[1]->ToObject());
  p->res  = Buffer::Data(args[2]->ToObject());
  p->argv = Buffer::Data(args[3]->ToObject());

  NanCallback* callback = new NanCallback(args[4].As<Function>());
  NanAsyncQueueWorker(new AsyncCallWorker(callback, p));

  NanReturnUndefined();
}

/*
 * Called on the thread pool.
 */

void AsyncCallWorker::Execute() {

#if __OBJC__ || __OBJC2__
  @try {
#endif
    ffi_call(
      (ffi_cif *)params->cif,
      FFI_FN(params->fn),
      (void *)params->res,
      (void **)params->argv
    );
#if __OBJC__ || __OBJC2__
  } @catch (id ex) {
    params->result = FFI_ASYNC_ERROR;
    params->err = (char *)ex;
  }
#endif
}

/*
 * Called after the AsyncFFICall function completes on the thread pool.
 * This gets run on the main loop thread.
 */

void AsyncCallWorker::HandleOKCallback() {
  NanScope();
  
  Handle<Value> argv[] = { NanNull() };
  if (params->result != FFI_OK) {
    // an Objective-C error was thrown
    argv[0] = WrapPointer(params->err);
  }

  TryCatch try_catch;

  // invoke the registered callback function
  callback->Call(1, argv);

  if (try_catch.HasCaught()) {
    FatalException(try_catch);
  }
}

void init(Handle<Object> target) {
  NanScope();

  FFI::InitializeBindings(target);
  FFI::InitializeStaticFunctions(target);
  CallbackInfo::Initialize(target);
}
NODE_MODULE(ffi_bindings, init);

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
  void *user_data = NULL;
  Buffer *buf = Buffer::New(ptr, size, wrap_pointer_cb, user_data);
  return buf->handle_;
}

///////////////

void FFI::InitializeStaticFunctions(Handle<Object> target) {
  Local<Object> o = Object::New();

  // atoi and abs here for testing purposes
  o->Set(String::NewSymbol("atoi"), WrapPointer((unsigned char *)atoi));

  // Windows has multiple `abs` signatures, so we need to manually disambiguate
  int (*absPtr)(int)(abs);
  o->Set(String::NewSymbol("abs"),  WrapPointer((unsigned char *)absPtr));

  // dl functions used by the DynamicLibrary JS class
  o->Set(String::NewSymbol("dlopen"),  WrapPointer((unsigned char *)dlopen));
  o->Set(String::NewSymbol("dlclose"), WrapPointer((unsigned char *)dlclose));
  o->Set(String::NewSymbol("dlsym"),   WrapPointer((unsigned char *)dlsym));
  o->Set(String::NewSymbol("dlerror"), WrapPointer((unsigned char *)dlerror));

  target->Set(String::NewSymbol("StaticFunctions"), o);
}

///////////////

void FFI::InitializeBindings(Handle<Object> target) {

  target->Set(String::NewSymbol("prepCif"), FunctionTemplate::New(FFIPrepCif)->GetFunction());
  target->Set(String::NewSymbol("strtoul"), FunctionTemplate::New(Strtoul)->GetFunction());

  target->Set(String::NewSymbol("FFI_TYPE_SIZE"), Integer::New(sizeof(ffi_type)), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
  target->Set(String::NewSymbol("FFI_CIF_SIZE"), Integer::New(sizeof(ffi_cif)), static_cast<PropertyAttribute>(ReadOnly|DontDelete));

  bool hasObjc = false;
#if __OBJC__ || __OBJC2__
  hasObjc = true;
#endif
  target->Set(String::NewSymbol("HAS_OBJC"), Boolean::New(hasObjc), static_cast<PropertyAttribute>(ReadOnly|DontDelete));

  Local<Object> ftmap = Object::New();
  ftmap->Set(String::NewSymbol("void"),     WrapPointer((unsigned char *)&ffi_type_void));
  //ftmap->Set(String::NewSymbol("byte"),     WrapPointer((unsigned char *)&ffi_type_uint8));
  ftmap->Set(String::NewSymbol("int8"),     WrapPointer((unsigned char *)&ffi_type_sint8));
  ftmap->Set(String::NewSymbol("uint8"),    WrapPointer((unsigned char *)&ffi_type_uint8));
  ftmap->Set(String::NewSymbol("uint16"),   WrapPointer((unsigned char *)&ffi_type_uint16));
  ftmap->Set(String::NewSymbol("int16"),    WrapPointer((unsigned char *)&ffi_type_sint16));
  ftmap->Set(String::NewSymbol("uint32"),   WrapPointer((unsigned char *)&ffi_type_uint32));
  ftmap->Set(String::NewSymbol("int32"),    WrapPointer((unsigned char *)&ffi_type_sint32));
  ftmap->Set(String::NewSymbol("uint64"),   WrapPointer((unsigned char *)&ffi_type_uint64));
  ftmap->Set(String::NewSymbol("int64"),    WrapPointer((unsigned char *)&ffi_type_sint64));
  ftmap->Set(String::NewSymbol("uchar"),    WrapPointer((unsigned char *)&ffi_type_uchar));
  ftmap->Set(String::NewSymbol("char"),     WrapPointer((unsigned char *)&ffi_type_schar));
  ftmap->Set(String::NewSymbol("ushort"),   WrapPointer((unsigned char *)&ffi_type_ushort));
  ftmap->Set(String::NewSymbol("short"),    WrapPointer((unsigned char *)&ffi_type_sshort));
  ftmap->Set(String::NewSymbol("uint"),     WrapPointer((unsigned char *)&ffi_type_uint));
  ftmap->Set(String::NewSymbol("int"),      WrapPointer((unsigned char *)&ffi_type_sint));
  ftmap->Set(String::NewSymbol("float"),    WrapPointer((unsigned char *)&ffi_type_float));
  ftmap->Set(String::NewSymbol("double"),   WrapPointer((unsigned char *)&ffi_type_double));
  ftmap->Set(String::NewSymbol("pointer"),  WrapPointer((unsigned char *)&ffi_type_pointer));
  //ftmap->Set(String::NewSymbol("size_t"),   WrapPointer((unsigned char *)&ffi_type_pointer));

  // libffi is weird when it comes to long data types (defaults to 64-bit), so we emulate here, since
  // some platforms have 32-bit longs and some platforms have 64-bit longs.
  /*if (sizeof(long) == 4) {
    ftmap->Set(String::NewSymbol("ulong"),    WrapPointer((unsigned char *)&ffi_type_uint32));
    ftmap->Set(String::NewSymbol("long"),     WrapPointer((unsigned char *)&ffi_type_sint32));
  } else if (sizeof(long) == 8) {
    ftmap->Set(String::NewSymbol("ulong"),    WrapPointer((unsigned char *)&ffi_type_uint64));
    ftmap->Set(String::NewSymbol("long"),     WrapPointer((unsigned char *)&ffi_type_sint64));
  }*/

  // Let libffi handle "long long"
  ftmap->Set(String::NewSymbol("ulonglong"), WrapPointer((unsigned char *)&ffi_type_ulong));
  ftmap->Set(String::NewSymbol("longlong"),  WrapPointer((unsigned char *)&ffi_type_slong));

  target->Set(String::NewSymbol("FFI_TYPES"), ftmap);
}

/*
 * Hard-coded `strtoul` binding, for the benchmarks.
 */

Handle<Value> FFI::Strtoul(const Arguments &args) {
  HandleScope scope;

  Pointer *middle = ObjectWrap::Unwrap<Pointer>(args[1]->ToObject());
  char buf[128];
  args[0]->ToString()->WriteUtf8(buf);

  unsigned long val = strtoul(buf, (char **)middle->GetPointer(), args[2]->Int32Value());

  return scope.Close(Integer::NewFromUnsigned(val));
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

Handle<Value> FFI::FFIPrepCif(const Arguments& args) {
  HandleScope scope;

  unsigned int nargs;
  char *rtype, *atypes, *cif;
  ffi_status status;

  if (args.Length() != 5) {
    return THROW_ERROR_EXCEPTION("prepCif() requires 5 arguments!");
  }

  nargs = args[0]->Uint32Value();
  rtype = ObjectWrap::Unwrap<Pointer>(args[1]->ToObject());
  atypes = ObjectWrap::Unwrap<Pointer>(args[2]->ToObject());

  cif = new Pointer(NULL);
  cif->Alloc(sizeof(ffi_cif));

  status = ffi_prep_cif(
      (ffi_cif *)cif->GetPointer(),
      FFI_DEFAULT_ABI,
      nargs,
      (ffi_type *)rtype->GetPointer(),
      (ffi_type **)atypes->GetPointer());

  if (status != FFI_OK) {
    delete cif;
    return THROW_ERROR_EXCEPTION("ffi_prep_cif() returned error.");
  }

  return scope.Close(WrapInstance(cif));
}

void init(Handle<Object> target) {
  HandleScope scope;

  FFI::InitializeBindings(target);
  FFI::InitializeStaticFunctions(target);
  CallbackInfo::Initialize(target);
  ForeignCaller::Initialize(target);
}
NODE_MODULE(ffi_bindings, init);

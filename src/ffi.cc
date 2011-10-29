#include "ffi.h"

///////////////

void FFI::InitializeStaticFunctions(Handle<Object> target)
{
    Local<Object>       o = Object::New();

    // abs and atoi here for testing purposes
    o->Set(String::New("abs"),      Pointer::WrapPointer((unsigned char *)abs));
    o->Set(String::New("atoi"),     Pointer::WrapPointer((unsigned char *)atoi));
    o->Set(String::New("dlopen"),   Pointer::WrapPointer((unsigned char *)dlopen));
    o->Set(String::New("dlclose"),  Pointer::WrapPointer((unsigned char *)dlclose));
    o->Set(String::New("dlsym"),    Pointer::WrapPointer((unsigned char *)dlsym));
    o->Set(String::New("dlerror"),  Pointer::WrapPointer((unsigned char *)dlerror));

    target->Set(String::NewSymbol("StaticFunctions"), o);
}

///////////////

void FFI::InitializeBindings(Handle<Object> target)
{
    Local<Object> o = Object::New();

    target->Set(String::New("free"),             FunctionTemplate::New(Free)->GetFunction());
    target->Set(String::New("prepCif"),          FunctionTemplate::New(FFIPrepCif)->GetFunction());
    target->Set(String::New("strtoul"),          FunctionTemplate::New(Strtoul)->GetFunction());
    target->Set(String::New("POINTER_SIZE"),     Integer::New(sizeof(unsigned char *)));
    target->Set(String::New("FFI_TYPE_SIZE"),    Integer::New(sizeof(ffi_type)));
#if __OBJC__ || __OBJC2__
    target->Set(String::New("HAS_OBJC"),         True(), static_cast<PropertyAttribute>(ReadOnly|DontDelete));
#endif

    Local<Object> smap = Object::New();
    smap->Set(String::New("byte"),      Integer::New(sizeof(unsigned char)));
    smap->Set(String::New("int8"),      Integer::New(sizeof(int8_t)));
    smap->Set(String::New("uint8"),     Integer::New(sizeof(uint8_t)));
    smap->Set(String::New("int16"),     Integer::New(sizeof(int16_t)));
    smap->Set(String::New("uint16"),    Integer::New(sizeof(uint16_t)));
    smap->Set(String::New("int32"),     Integer::New(sizeof(int32_t)));
    smap->Set(String::New("uint32"),    Integer::New(sizeof(uint32_t)));
    smap->Set(String::New("int64"),     Integer::New(sizeof(int64_t)));
    smap->Set(String::New("uint64"),    Integer::New(sizeof(uint64_t)));
    smap->Set(String::New("char"),      Integer::New(sizeof(char)));
    smap->Set(String::New("uchar"),     Integer::New(sizeof(unsigned char)));
    smap->Set(String::New("short"),     Integer::New(sizeof(short)));
    smap->Set(String::New("ushort"),    Integer::New(sizeof(unsigned short)));
    smap->Set(String::New("int"),       Integer::New(sizeof(int)));
    smap->Set(String::New("uint"),      Integer::New(sizeof(unsigned int)));
    smap->Set(String::New("long"),      Integer::New(sizeof(long)));
    smap->Set(String::New("ulong"),     Integer::New(sizeof(unsigned long)));
    smap->Set(String::New("longlong"),  Integer::New(sizeof(long long)));
    smap->Set(String::New("ulonglong"), Integer::New(sizeof(unsigned long long)));
    smap->Set(String::New("float"),     Integer::New(sizeof(float)));
    smap->Set(String::New("double"),    Integer::New(sizeof(double)));
    smap->Set(String::New("pointer"),   Integer::New(sizeof(unsigned char *)));
    smap->Set(String::New("string"),    Integer::New(sizeof(char *)));
    smap->Set(String::New("size_t"),    Integer::New(sizeof(size_t)));
    // Size of a Persistent handle to a JS object
    smap->Set(String::New("Object"),    Integer::New(sizeof(Persistent<Value>)));

    Local<Object> ftmap = Object::New();
    ftmap->Set(String::New("void"),     Pointer::WrapPointer((unsigned char *)&ffi_type_void));
    ftmap->Set(String::New("byte"),     Pointer::WrapPointer((unsigned char *)&ffi_type_uint8));
    ftmap->Set(String::New("int8"),     Pointer::WrapPointer((unsigned char *)&ffi_type_sint8));
    ftmap->Set(String::New("uint8"),    Pointer::WrapPointer((unsigned char *)&ffi_type_uint8));
    ftmap->Set(String::New("uint16"),   Pointer::WrapPointer((unsigned char *)&ffi_type_uint16));
    ftmap->Set(String::New("int16"),    Pointer::WrapPointer((unsigned char *)&ffi_type_sint16));
    ftmap->Set(String::New("uint32"),   Pointer::WrapPointer((unsigned char *)&ffi_type_uint32));
    ftmap->Set(String::New("int32"),    Pointer::WrapPointer((unsigned char *)&ffi_type_sint32));
    ftmap->Set(String::New("uint64"),   Pointer::WrapPointer((unsigned char *)&ffi_type_uint64));
    ftmap->Set(String::New("int64"),    Pointer::WrapPointer((unsigned char *)&ffi_type_sint64));
    ftmap->Set(String::New("uchar"),    Pointer::WrapPointer((unsigned char *)&ffi_type_uchar));
    ftmap->Set(String::New("char"),     Pointer::WrapPointer((unsigned char *)&ffi_type_schar));
    ftmap->Set(String::New("ushort"),   Pointer::WrapPointer((unsigned char *)&ffi_type_ushort));
    ftmap->Set(String::New("short"),    Pointer::WrapPointer((unsigned char *)&ffi_type_sshort));
    ftmap->Set(String::New("uint"),     Pointer::WrapPointer((unsigned char *)&ffi_type_uint));
    ftmap->Set(String::New("int"),      Pointer::WrapPointer((unsigned char *)&ffi_type_sint));
    ftmap->Set(String::New("float"),    Pointer::WrapPointer((unsigned char *)&ffi_type_float));
    ftmap->Set(String::New("double"),   Pointer::WrapPointer((unsigned char *)&ffi_type_double));
    ftmap->Set(String::New("pointer"),  Pointer::WrapPointer((unsigned char *)&ffi_type_pointer));
    ftmap->Set(String::New("string"),   Pointer::WrapPointer((unsigned char *)&ffi_type_pointer));
    ftmap->Set(String::New("size_t"),   Pointer::WrapPointer((unsigned char *)&ffi_type_pointer));

    // libffi is weird when it comes to long data types (defaults to 64-bit), so we emulate here, since
    // some platforms have 32-bit longs and some platforms have 64-bit longs.
    if (sizeof(long) == 4) {
        ftmap->Set(String::New("ulong"),    Pointer::WrapPointer((unsigned char *)&ffi_type_uint32));
        ftmap->Set(String::New("long"),     Pointer::WrapPointer((unsigned char *)&ffi_type_sint32));
    } else if (sizeof(long) == 8) {
        ftmap->Set(String::New("ulong"),    Pointer::WrapPointer((unsigned char *)&ffi_type_uint64));
        ftmap->Set(String::New("long"),     Pointer::WrapPointer((unsigned char *)&ffi_type_sint64));
    }

    // Let libffi handle "long long"
    ftmap->Set(String::New("ulonglong"),Pointer::WrapPointer((unsigned char *)&ffi_type_ulong));
    ftmap->Set(String::New("longlong"), Pointer::WrapPointer((unsigned char *)&ffi_type_slong));

    target->Set(String::New("FFI_TYPES"), ftmap);
    target->Set(String::New("TYPE_SIZE_MAP"), smap);
}

Handle<Value> FFI::Free(const Arguments &args)
{
    HandleScope scope;
    Pointer *p = ObjectWrap::Unwrap<Pointer>(args[0]->ToObject());
    free(p->GetPointer());
    return Undefined();
}

Handle<Value> FFI::Strtoul(const Arguments &args)
{
    HandleScope scope;
    Pointer *middle = ObjectWrap::Unwrap<Pointer>(args[1]->ToObject());
    char buf[128];
    args[0]->ToString()->WriteUtf8(buf);

    unsigned long val = strtoul(buf, (char **)middle->GetPointer(), args[2]->Int32Value());

    return scope.Close(Integer::NewFromUnsigned(val));
}

Handle<Value> FFI::FFIPrepCif(const Arguments& args)
{
    HandleScope scope;

    if (args.Length() == 3) {
        unsigned int nargs  = args[0]->Uint32Value();
        Pointer *rtype      = ObjectWrap::Unwrap<Pointer>(args[1]->ToObject());
        Pointer *atypes     = ObjectWrap::Unwrap<Pointer>(args[2]->ToObject());
        ffi_status status;

        Pointer *cif = new Pointer(NULL);
        cif->Alloc(sizeof(ffi_cif));

        if ((status = ffi_prep_cif(
            (ffi_cif *)cif->GetPointer(),
            FFI_DEFAULT_ABI,
            nargs,
            (ffi_type *)rtype->GetPointer(),
            (ffi_type **)atypes->GetPointer()))) {

            delete cif;
            return THROW_ERROR_EXCEPTION("ffi_prep_cif() returned error.");
        }

        return scope.Close(Pointer::WrapInstance(cif));
    }
    else {
        return THROW_ERROR_EXCEPTION("Not Enough Arguments");
    }
}

///////////////

extern "C" {
  static void init(Handle<Object> target) {
    HandleScope scope;

    Pointer::Initialize(target);
    FFI::InitializeBindings(target);
    FFI::InitializeStaticFunctions(target);
    CallbackInfo::Initialize(target);
    ForeignCaller::Initialize(target);
  }
  NODE_MODULE(ffi_bindings, init);
}

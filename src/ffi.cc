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
    
    target->Set(String::New("call"),             FunctionTemplate::New(FFICall)->GetFunction());
    target->Set(String::New("prepCif"),          FunctionTemplate::New(FFIPrepCif)->GetFunction());
   
    target->Set(String::New("POINTER_SIZE"),     Integer::New(sizeof(unsigned char *)));
    target->Set(String::New("SIZE_SIZE"),        Integer::New(sizeof(size_t)));
    target->Set(String::New("FFI_TYPE_SIZE"),    Integer::New(sizeof(ffi_type)));
    
    Local<Object> smap = Object::New();
    smap->Set(String::New("byte"),      Integer::New(sizeof(unsigned char)));
    smap->Set(String::New("int8"),      Integer::New(sizeof(int8_t)));    
    smap->Set(String::New("uint8"),     Integer::New(sizeof(uint8_t)));    
    smap->Set(String::New("int16"),     Integer::New(sizeof(int64_t)));
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
    }
    else if (sizeof(long) == 8) {
        ftmap->Set(String::New("ulong"),    Pointer::WrapPointer((unsigned char *)&ffi_type_uint64));
        ftmap->Set(String::New("long"),     Pointer::WrapPointer((unsigned char *)&ffi_type_sint64));        
    }
    
    // Let libffi handle "long long"
    ftmap->Set(String::New("ulonglong"),Pointer::WrapPointer((unsigned char *)&ffi_type_ulong));
    ftmap->Set(String::New("longlong"), Pointer::WrapPointer((unsigned char *)&ffi_type_slong));
    
    target->Set(String::New("FFI_TYPES"), ftmap);
    target->Set(String::New("TYPE_SIZE_MAP"), smap);    
}

int FFI::AsyncFFICall(eio_req *req)
{        
    AsyncCallParams *p = (AsyncCallParams *)req->data;
    ffi_call(p->cif, p->ptr, p->res, p->args);
    return 0;
}

int FFI::FinishAsyncFFICall(eio_req *req)
{
    AsyncCallParams *p = (AsyncCallParams *)req->data;
    Local<Value> argv[1];
    
    argv[0] = Local<Value>::New(String::New("success"));

    // emit a success event
    Local<Function> emit = Local<Function>::Cast(p->emitter->Get(String::NewSymbol("emit")));
    emit->Call(p->emitter, 1, argv);
    
    // unref the event loop (ref'd in FFICall)
    ev_unref(EV_DEFAULT_UC);
    
    // dispose of our persistent handle to the EventEmitter object
    p->emitter.Dispose();
    
    // free up our memory (allocated in FFICall)
    delete p;
    
    return 0;
}

Handle<Value> FFI::FFICall(const Arguments& args)
{
    if (args.Length() >= 4) {
        Pointer *cif    = ObjectWrap::Unwrap<Pointer>(args[0]->ToObject());
        Pointer *fn     = ObjectWrap::Unwrap<Pointer>(args[1]->ToObject());
        Pointer *fnargs = ObjectWrap::Unwrap<Pointer>(args[2]->ToObject());
        Pointer *res    = ObjectWrap::Unwrap<Pointer>(args[3]->ToObject());
        bool async      = false;
        
        if (args.Length() == 5 && args[4]->IsBoolean() && args[4]->BooleanValue())
            async = true;
        
        // printf("FFI::FFICall: ffi_call(%p, %p, %p, %p)\n",
        //           (ffi_cif *)cif->GetPointer(),
        //           (void (*)(void))fn->GetPointer(),
        //           (void *)res->GetPointer(),
        //           (void **)fnargs->GetPointer());
        if (async) {
            HandleScope scope;
            AsyncCallParams *p = new AsyncCallParams();
            
            // cuter way of doing this?
            p->cif = (ffi_cif *)cif->GetPointer();
            p->ptr = (void (*)(void))fn->GetPointer();
            p->res = (void *)res->GetPointer();
            p->args = (void **)fnargs->GetPointer();
            
            // get the events.EventEmitter constructor
            
            Local<Object> global = Context::GetCurrent()->Global();
            Local<Object> events = global->Get(String::NewSymbol("process"))->ToObject();
            Local<Function> emitterConstructor = Local<Function>::Cast(events->Get(String::NewSymbol("EventEmitter")));
            
            // construct a new process.Promise object
            p->emitter = Persistent<Object>::New(emitterConstructor->NewInstance());
            
            ev_ref(EV_DEFAULT_UC);
            eio_custom(FFI::AsyncFFICall, EIO_PRI_DEFAULT, FFI::FinishAsyncFFICall, p);
            
            return scope.Close(p->emitter);
        }
        else {
            ffi_call(
                (ffi_cif *)cif->GetPointer(),
                (void (*)(void))fn->GetPointer(),
                (void *)res->GetPointer(),
                (void **)fnargs->GetPointer()
            );
        }
    }
    else {
        return ThrowException(String::New("Not Enough Parameters"));
    }
    
    return Undefined();
}

Handle<Value> FFI::FFIPrepCif(const Arguments& args)
{
    HandleScope     scope;

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
            return ThrowException(String::New("ffi_prep_cif() returned error."));
        }
        
        return scope.Close(Pointer::WrapInstance(cif));
    }
    else {
        return ThrowException(String::New("Not Enough Arguments"));
    }
}

///////////////

extern "C" void init(Handle<Object> target)
{
    HandleScope scope;
    
    Pointer::Initialize(target);
    FFI::InitializeBindings(target);
    FFI::InitializeStaticFunctions(target);
    CallbackInfo::Initialize(target);
}

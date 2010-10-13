#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <string.h>
#include <dlfcn.h>
#include <sys/mman.h>
#ifdef __APPLE__
#include <ffi/ffi.h>
#else
#include <ffi.h>
#endif
#include <node/eio.h>
#include <node/node_events.h>
#include <node_object_wrap.h>
#include <node.h>
#include <pthread.h>
#include <queue>
#include "_node-ffi.h"

#define SZ_BYTE     255

Pointer::Pointer(unsigned char *ptr)
{
    this->m_ptr = ptr;
    this->m_allocated = 0;
}

Pointer::~Pointer()
{
    if (this->m_allocated) {
        //printf("Pointer destructor called on ALLOCATED area\n");
        free(this->m_ptr);
    }
}

Persistent<FunctionTemplate> Pointer::pointer_template;

Handle<FunctionTemplate> Pointer::MakeTemplate()
{
    HandleScope scope;
    Handle<FunctionTemplate> t = FunctionTemplate::New(New);

    Local<ObjectTemplate> inst = t->InstanceTemplate();
    inst->SetInternalFieldCount(2);
    inst->SetAccessor(String::NewSymbol("address"), GetAddress);
    inst->SetAccessor(String::NewSymbol("allocated"), GetAllocated);
    
    return scope.Close(t);
}

void Pointer::Initialize(Handle<Object> target)
{
    HandleScope scope;
    
    if (pointer_template.IsEmpty()) {
        pointer_template = Persistent<FunctionTemplate>::New(MakeTemplate());
    }
    
    Handle<FunctionTemplate> t = pointer_template;
    
    NODE_SET_PROTOTYPE_METHOD(t, "seek", Seek);
    NODE_SET_PROTOTYPE_METHOD(t, "putByte", PutByte);
    NODE_SET_PROTOTYPE_METHOD(t, "getByte", GetByte);
    NODE_SET_PROTOTYPE_METHOD(t, "putInt8", PutInt8);
    NODE_SET_PROTOTYPE_METHOD(t, "getInt8", GetInt8);
    NODE_SET_PROTOTYPE_METHOD(t, "putInt16", PutInt16);
    NODE_SET_PROTOTYPE_METHOD(t, "getInt16", GetInt16);
    NODE_SET_PROTOTYPE_METHOD(t, "putUInt16", PutUInt16);
    NODE_SET_PROTOTYPE_METHOD(t, "getUInt16", GetUInt16);
    NODE_SET_PROTOTYPE_METHOD(t, "putInt32", PutInt32);
    NODE_SET_PROTOTYPE_METHOD(t, "getInt32", GetInt32);
    NODE_SET_PROTOTYPE_METHOD(t, "putUInt32", PutUInt32);
    NODE_SET_PROTOTYPE_METHOD(t, "getUInt32", GetUInt32);
    NODE_SET_PROTOTYPE_METHOD(t, "putInt64", PutInt64);
    NODE_SET_PROTOTYPE_METHOD(t, "getInt64", GetInt64);
    NODE_SET_PROTOTYPE_METHOD(t, "putUInt64", PutUInt64);
    NODE_SET_PROTOTYPE_METHOD(t, "getUInt64", GetUInt64);
    NODE_SET_PROTOTYPE_METHOD(t, "putFloat", PutFloat);
    NODE_SET_PROTOTYPE_METHOD(t, "getFloat", GetFloat);
    NODE_SET_PROTOTYPE_METHOD(t, "putDouble", PutDouble);
    NODE_SET_PROTOTYPE_METHOD(t, "getDouble", GetDouble);
    NODE_SET_PROTOTYPE_METHOD(t, "putPointer", PutPointerMethod);
    NODE_SET_PROTOTYPE_METHOD(t, "getPointer", GetPointerMethod);
    NODE_SET_PROTOTYPE_METHOD(t, "putCString", PutCString);
    NODE_SET_PROTOTYPE_METHOD(t, "getCString", GetCString);
    NODE_SET_PROTOTYPE_METHOD(t, "isNull", IsNull);
    
    target->Set(String::NewSymbol("Pointer"), t->GetFunction());
}

unsigned char *Pointer::GetPointer()
{
    return this->m_ptr;
}

void Pointer::MovePointer(int bytes)
{
    this->m_ptr += bytes;
}

void Pointer::Alloc(size_t bytes)
{
    if (!this->m_allocated && bytes > 0) {
        this->m_ptr = (unsigned char *)malloc(bytes);
        
        if (this->m_ptr != NULL) {
            this->m_allocated = bytes;
        }
        else {
            throw "malloc(): Could not allocate Memory";
        }
    }
}

Handle<Object> Pointer::WrapInstance(Pointer *inst)
{
    HandleScope     scope;
    Local<Object>   obj = pointer_template->GetFunction()->NewInstance();
    inst->Wrap(obj);
    return scope.Close(obj);
}

Handle<Object> Pointer::WrapPointer(unsigned char *ptr)
{
    return WrapInstance(new Pointer(ptr));
}

Handle<Value> Pointer::New(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = new Pointer(NULL);
    
    if (args.Length() == 1 && args[0]->IsNumber()) {
        unsigned int sz = args[0]->Uint32Value();
        self->Alloc(sz);
    }
    
    // TODO: Figure out how to throw an exception here for zero args but not
    // break WrapPointer's NewInstance() call.
    
    self->Wrap(args.This());
    return args.This();
}

Handle<Value> Pointer::GetAddress(Local<String> name, const AccessorInfo& info)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(info.Holder());
    Handle<Value>   ret;
    
    // TODO: make this access the private var directly
    ret = Number::New((size_t)self->GetPointer());
    
    return scope.Close(ret);
}

Handle<Value> Pointer::GetAllocated(Local<String> name, const AccessorInfo& info)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(info.Holder());
    Handle<Value>   ret;
    
    ret = Integer::New(self->m_allocated);
    
    return scope.Close(ret);
}


Handle<Value> Pointer::Seek(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    Handle<Value>   ret;
    
    if (args.Length() > 0 && args[0]->IsNumber()) {
        size_t offset = args[0]->IntegerValue();
        ret = WrapPointer(static_cast<unsigned char *>(self->GetPointer()) + offset);      
    }
    else {
        return ThrowException(String::New("Must specify an offset"));
    }
    
    return scope.Close(ret);
}

Handle<Value> Pointer::PutByte(const Arguments& args)
{    
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        unsigned int val = args[0]->Uint32Value();
        
        if (val <= SZ_BYTE) {
            unsigned char conv = val;
            *ptr = conv;
        }
        else {
            return ThrowException(String::New("Byte out of Range."));
        }
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(unsigned char));
    }

    return Undefined();
}

Handle<Value> Pointer::GetByte(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(unsigned char));
    }

    return scope.Close(Integer::New(*ptr));
}

Handle<Value> Pointer::PutInt8(const Arguments& args)
{    
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        int val = args[0]->Int32Value();
        
        if (val >= (0 - (SZ_BYTE / 2)) && val <= (SZ_BYTE / 2)) {
            char conv = val;
            *ptr = conv;
        }
        else {
            return ThrowException(String::New("Value out of Range."));
        }
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(char));
    }

    return Undefined();
}

Handle<Value> Pointer::GetInt8(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(char));
    }

    return scope.Close(Integer::New(*(char *)ptr));
}


Handle<Value> Pointer::PutInt16(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    // TODO: Exception handling here for out of range values
    if (args.Length() >= 1 && args[0]->IsNumber()) {
        short val = args[0]->Int32Value();
        memcpy(ptr, &val, sizeof(short));
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(short));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetInt16(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    short           val = *((short *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(short));
    }
    
    return scope.Close(Integer::New(val));
}

Handle<Value> Pointer::PutUInt16(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    // TODO: Exception handling here for out of range values
    if (args.Length() >= 1 && args[0]->IsNumber()) {
        unsigned short val = (unsigned short)args[0]->Uint32Value();
        memcpy(ptr, &val, sizeof(unsigned short));
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(unsigned short));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetUInt16(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    unsigned short  val = *((unsigned short *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(unsigned short));
    }

    return scope.Close(Integer::New(val));
}

Handle<Value> Pointer::PutInt32(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        int val = args[0]->Int32Value();
        memcpy(ptr, &val, sizeof(int));
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(int));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetInt32(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    int             val = *((int *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(int));
    }
    
    return scope.Close(Integer::New(val));
}

Handle<Value> Pointer::PutUInt32(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        unsigned int val = args[0]->Uint32Value();
        memcpy(ptr, &val, sizeof(unsigned int));
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(unsigned int));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetUInt32(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    unsigned int    val = *((unsigned int *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(unsigned int));
    }

    return scope.Close(Integer::NewFromUnsigned(val));
}

Handle<Value> Pointer::PutInt64(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        int64_t val = args[0]->IntegerValue();
        memcpy(ptr, &val, sizeof(int64_t));
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(int64_t));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetInt64(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    int64_t         val = *((int64_t *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(int64_t));
    }
    
    // TODO: A way for V8 to take this int64_t as what it should be?
    return scope.Close(Number::New(val));
}

Handle<Value> Pointer::PutUInt64(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        uint64_t val = args[0]->IntegerValue();
        memcpy(ptr, &val, sizeof(uint64_t));
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(uint64_t));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetUInt64(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    uint64_t        val = *((uint64_t *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(uint64_t));
    }

    // TODO: A way for V8 to take this int64_t as what it should be?
    return scope.Close(Number::New(val));
}

Handle<Value> Pointer::PutFloat(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        float val = args[0]->NumberValue();
        memcpy(ptr, &val, sizeof(float));
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(float));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetFloat(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    float           val = *((float *)ptr);
    double          valRet = val;
    
    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(float));
    }
    
    return scope.Close(Number::New(valRet));
}

Handle<Value> Pointer::PutDouble(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        double val = args[0]->NumberValue();
        memcpy(ptr, &val, sizeof(double));
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(double));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetDouble(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    double          val = *((double *)ptr);
    
    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(double));
    }
    
    return scope.Close(Number::New(val));
}

Handle<Value> Pointer::PutPointerMethod(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1) {
        Pointer *obj = ObjectWrap::Unwrap<Pointer>(args[0]->ToObject());
        *((unsigned char **)ptr) = obj->GetPointer();
        //printf("Pointer::PutPointerMethod: writing pointer %p at %p\n", *((unsigned char **)ptr), ptr);

        if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
            self->MovePointer(sizeof(unsigned char *));
        }
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetPointerMethod(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    unsigned char   *val;
    unsigned char   **dptr = (unsigned char **)ptr;
    
    val = *((unsigned char **)ptr);
    
    //printf("Pointer::GetPointerMethod: got %p from %p\n", val, ptr);
    
    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(unsigned char *));
    }
    
    return scope.Close(WrapPointer(val));
}

Handle<Value> Pointer::PutCString(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsString()) {
        String::Utf8Value str(args[0]->ToString());
        strcpy((char *)ptr, *str);
        
        // printf("Pointer::PutCString: (%p) %s\n", ptr, *str);
        
        if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
            self->MovePointer(strlen(*str));
        }
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetCString(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    char            *val = (char *)self->GetPointer();
    
    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(unsigned char *));
    }
    
    //printf("Pointer::GetCString (%p): %s\n", self->GetPointer(), val);
    
    return scope.Close(String::New(val));
}

Handle<Value> Pointer::IsNull(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    return scope.Close(Boolean::New(self->GetPointer() == NULL));
}

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
    
    o->Set(String::New("call"),             FunctionTemplate::New(FFICall)->GetFunction());
    o->Set(String::New("prepCif"),          FunctionTemplate::New(FFIPrepCif)->GetFunction());
   
    o->Set(String::New("POINTER_SIZE"),     Integer::New(sizeof(unsigned char *)));
    o->Set(String::New("SIZE_SIZE"),        Integer::New(sizeof(size_t)));
    o->Set(String::New("FFI_TYPE_SIZE"),    Integer::New(sizeof(ffi_type)));
    
    Local<Object> smap = Object::New();
    smap->Set(String::New("byte"),      Integer::New(sizeof(unsigned char)));
    smap->Set(String::New("int8"),      Integer::New(sizeof(char)));    
    smap->Set(String::New("int16"),     Integer::New(sizeof(short)));
    smap->Set(String::New("uint16"),    Integer::New(sizeof(unsigned short)));    
    smap->Set(String::New("int32"),     Integer::New(sizeof(int)));
    smap->Set(String::New("uint32"),    Integer::New(sizeof(unsigned int)));
    smap->Set(String::New("int32"),     Integer::New(sizeof(int64_t)));
    smap->Set(String::New("uint32"),    Integer::New(sizeof(uint64_t)));
    smap->Set(String::New("float"),     Integer::New(sizeof(float)));
    smap->Set(String::New("double"),    Integer::New(sizeof(double)));
    smap->Set(String::New("pointer"),   Integer::New(sizeof(unsigned char *)));
    smap->Set(String::New("string"),    Integer::New(sizeof(char *)));
    
    Local<Object> ftmap = Object::New();
    ftmap->Set(String::New("void"),     Pointer::WrapPointer((unsigned char *)&ffi_type_void));
    ftmap->Set(String::New("byte"),     Pointer::WrapPointer((unsigned char *)&ffi_type_uint8));
    ftmap->Set(String::New("int8"),     Pointer::WrapPointer((unsigned char *)&ffi_type_sint8));
    ftmap->Set(String::New("uint16"),   Pointer::WrapPointer((unsigned char *)&ffi_type_uint16));
    ftmap->Set(String::New("int16"),    Pointer::WrapPointer((unsigned char *)&ffi_type_sint16));
    ftmap->Set(String::New("uint32"),   Pointer::WrapPointer((unsigned char *)&ffi_type_uint32));
    ftmap->Set(String::New("int32"),    Pointer::WrapPointer((unsigned char *)&ffi_type_sint32));
    ftmap->Set(String::New("uint64"),   Pointer::WrapPointer((unsigned char *)&ffi_type_uint64));
    ftmap->Set(String::New("sint64"),   Pointer::WrapPointer((unsigned char *)&ffi_type_sint64));
    ftmap->Set(String::New("float"),    Pointer::WrapPointer((unsigned char *)&ffi_type_float));
    ftmap->Set(String::New("double"),   Pointer::WrapPointer((unsigned char *)&ffi_type_double));
    ftmap->Set(String::New("pointer"),  Pointer::WrapPointer((unsigned char *)&ffi_type_pointer));
    ftmap->Set(String::New("string"),   Pointer::WrapPointer((unsigned char *)&ffi_type_pointer));
    
    o->Set(String::New("FFI_TYPES"), ftmap);
    o->Set(String::New("TYPE_SIZE_MAP"), smap);
    target->Set(String::NewSymbol("Bindings"), o);
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
    Local<Value> argv[0];
    
    // emit a success event
    Local<Function> emit = Local<Function>::Cast(p->emitter->Get(String::NewSymbol("emit")));
    emit->Call(p->emitter, 0, argv);
    
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

ThreadedCallbackInvokation::ThreadedCallbackInvokation(CallbackInfo *cbinfo, void *retval, void **parameters)
{
    m_cbinfo = cbinfo;
    m_retval = retval;
    m_parameters = parameters;
    
    pthread_mutex_init(&m_mutex, NULL);
    pthread_cond_init(&m_cond, NULL);
    ev_ref(EV_DEFAULT_UC_); // hold the event loop open while this is executing
}

ThreadedCallbackInvokation::~ThreadedCallbackInvokation()
{
    ev_unref(EV_DEFAULT_UC_);
    pthread_cond_destroy(&m_cond);
    pthread_mutex_destroy(&m_mutex);
}

void ThreadedCallbackInvokation::SignalDoneExecuting()
{
    pthread_mutex_lock(&m_mutex);
    pthread_cond_signal(&m_cond);
    pthread_mutex_unlock(&m_mutex);
}

void ThreadedCallbackInvokation::WaitForExecution()
{
    pthread_mutex_lock(&m_mutex);
    pthread_cond_wait(&m_cond, &m_mutex);
    pthread_mutex_unlock(&m_mutex);
}

Persistent<FunctionTemplate> CallbackInfo::callback_template;
pthread_t CallbackInfo::g_mainthread;
pthread_mutex_t CallbackInfo::g_queue_mutex;
std::queue<ThreadedCallbackInvokation *> CallbackInfo::g_queue;
ev_async CallbackInfo::g_async;

CallbackInfo::CallbackInfo(Handle<Function> func, void *closure)
{
    m_function = Persistent<Function>::New(func);
    m_closure = closure;
}

CallbackInfo::~CallbackInfo()
{
    munmap(m_closure, sizeof(ffi_closure));
    m_function.Dispose();    
}

void CallbackInfo::DispatchToV8(CallbackInfo *self, void *retval, void **parameters)
{
    Handle<Value> argv[2];
    argv[0] = Pointer::WrapPointer((unsigned char *)retval);
    argv[1] = Pointer::WrapPointer((unsigned char *)parameters);
    self->m_function->Call(self->m_this, 2, argv);
}

void CallbackInfo::WatcherCallback(EV_P_ ev_async *w, int revents)
{    
    pthread_mutex_lock(&g_queue_mutex);
    
    while (!g_queue.empty()) {
        ThreadedCallbackInvokation *inv = g_queue.front();
        g_queue.pop();
        
        DispatchToV8(inv->m_cbinfo, inv->m_retval, inv->m_parameters);
        inv->SignalDoneExecuting();
    }
    
    pthread_mutex_unlock(&g_queue_mutex);
}

void CallbackInfo::Initialize(Handle<Object> target)
{
    HandleScope scope;
    
    if (callback_template.IsEmpty()) {
        callback_template = Persistent<FunctionTemplate>::New(MakeTemplate());
    }
    
    Handle<FunctionTemplate> t = callback_template;
    
    //NODE_SET_PROTOTYPE_METHOD(t, "methud", Seek);
    
    target->Set(String::NewSymbol("CallbackInfo"), t->GetFunction());
    
    // initialize our threaded invokation stuff
    g_mainthread = pthread_self();
    ev_async_init(EV_DEFAULT_UC_ &g_async, CallbackInfo::WatcherCallback);
    pthread_mutex_init(&g_queue_mutex, NULL);
    ev_async_start(EV_DEFAULT_UC_ &g_async);
    ev_unref(EV_DEFAULT_UC); // allow the event loop to exit while this is running
}

Handle<Value> CallbackInfo::New(const Arguments& args)
{
    // cif, function / TODO: Check args
    if (args.Length() >= 2) {
        Pointer         *cif        = ObjectWrap::Unwrap<Pointer>(args[0]->ToObject());
        Local<Function> callback    = Local<Function>::Cast(args[1]);
        ffi_closure     *closure;
        
        if ((closure = (ffi_closure *)mmap(NULL, sizeof(ffi_closure), PROT_READ | PROT_WRITE | PROT_EXEC,
            MAP_ANON | MAP_PRIVATE, -1, 0)) == (void*)-1)
        {
            return ThrowException(String::New("mmap() Returned Error"));
        }
        
        CallbackInfo *self = new CallbackInfo(
            callback,
            closure
        );
        
        // TODO: Check for failure here
        ffi_prep_closure(
            closure,
            (ffi_cif *)cif->GetPointer(),
            Invoke,
            (void *)self
        );
        
        self->Wrap(args.This());
        self->m_this = args.This();
        
        return args.This();
    }
    else {
        return ThrowException(String::New("Not enough arguments."));
    }
}

Handle<FunctionTemplate> CallbackInfo::MakeTemplate()
{
    HandleScope scope;
    Handle<FunctionTemplate> t = FunctionTemplate::New(New);

    Local<ObjectTemplate> inst = t->InstanceTemplate();
    inst->SetInternalFieldCount(1);
    inst->SetAccessor(String::NewSymbol("pointer"), GetPointer);
    
    return scope.Close(t);
}

void CallbackInfo::Invoke(ffi_cif *cif, void *retval, void **parameters, void *user_data)
{
    CallbackInfo    *self = (CallbackInfo *)user_data;
    
    // are we executing from another thread?
    if (!pthread_equal(pthread_self(), g_mainthread)) {
        // create a temporary storage area for our invokation parameters
        ThreadedCallbackInvokation *inv = new ThreadedCallbackInvokation(self, retval, parameters);
        
        // push it to the queue -- threadsafe
        pthread_mutex_lock(&g_queue_mutex);   
        g_queue.push(inv);
        pthread_mutex_unlock(&g_queue_mutex);
 
        // send a message to our main thread to wake up the WatchCallback loop
        ev_async_send(EV_DEFAULT_UC_ &g_async);
        
        // wait for signal from calling thread
        inv->WaitForExecution();
        
        delete inv;
    }
    else {
        DispatchToV8(self, retval, parameters);
    }
}

Handle<Value> CallbackInfo::GetPointer(Local<String> name, const AccessorInfo& info)
{
    HandleScope     scope;
    CallbackInfo    *self = ObjectWrap::Unwrap<CallbackInfo>(info.Holder());
    return scope.Close(Pointer::WrapPointer((unsigned char *)self->m_closure));
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

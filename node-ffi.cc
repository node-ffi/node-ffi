#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <node.h>
#include <node_object_wrap.h>
#include <string.h>
#include <dlfcn.h>
#include <ffi/ffi.h>
#include "node-ffi.h"

#define SZ_BYTE     255

Pointer::Pointer(unsigned char *ptr)
{
    this->m_ptr = ptr;
    this->m_allocated = 0;
}

Pointer::~Pointer()
{
    if (this->m_allocated) {
        free(this->m_ptr);
    }
}

Persistent<FunctionTemplate> Pointer::pointer_template;

Handle<FunctionTemplate> Pointer::MakeTemplate()
{
    HandleScope scope;
    Handle<FunctionTemplate> t = FunctionTemplate::New(New);

    Local<ObjectTemplate> inst = t->InstanceTemplate();
    inst->SetInternalFieldCount(1);
    inst->SetAccessor(String::NewSymbol("address"), GetAddress);
    
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
    NODE_SET_PROTOTYPE_METHOD(t, "putInt32", PutInt32);
    NODE_SET_PROTOTYPE_METHOD(t, "getInt32", GetInt32);
    NODE_SET_PROTOTYPE_METHOD(t, "putUInt32", PutUInt32);
    NODE_SET_PROTOTYPE_METHOD(t, "getUInt32", GetUInt32);
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
    if (!this->m_allocated) {
        this->m_ptr = (unsigned char *)malloc(bytes);
        this->m_allocated = bytes;
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
    unsigned int    ptr;
    Handle<Value>   ret;
    
    ptr = (unsigned int)self->GetPointer();
    ret = Integer::New(ptr);
    
    return scope.Close(ret);
}

Handle<Value> Pointer::Seek(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    Handle<Value>   ret;
    
    if (args.Length() > 0 && args[0]->IsNumber()) {
        int offset = args[0]->Int32Value();
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

    return scope.Close(Integer::New(val));
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
        
        //printf("Pointer::PutCString: (%p) %s\n", ptr, *str);
        
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
    smap->Set(String::New("sint8"),     Integer::New(sizeof(char)));    
    smap->Set(String::New("uint8"),     Integer::New(sizeof(unsigned char)));    
    smap->Set(String::New("int16"),     Integer::New(sizeof(unsigned short)));    
    smap->Set(String::New("sint16"),    Integer::New(sizeof(short)));
    smap->Set(String::New("uint16"),    Integer::New(sizeof(short)));    
    smap->Set(String::New("int32"),     Integer::New(sizeof(int)));
    smap->Set(String::New("sint32"),    Integer::New(sizeof(int)));
    smap->Set(String::New("uint32"),    Integer::New(sizeof(unsigned int)));
    smap->Set(String::New("float"),     Integer::New(sizeof(float)));
    smap->Set(String::New("double"),    Integer::New(sizeof(double)));
    smap->Set(String::New("pointer"),   Integer::New(sizeof(unsigned char *)));
    smap->Set(String::New("string"),    Integer::New(sizeof(char *)));
    
    Local<Object> ftmap = Object::New();
    ftmap->Set(String::New("void"),     Pointer::WrapPointer((unsigned char *)&ffi_type_void));
    ftmap->Set(String::New("uint8"),    Pointer::WrapPointer((unsigned char *)&ffi_type_uint8));
    ftmap->Set(String::New("sint8"),    Pointer::WrapPointer((unsigned char *)&ffi_type_sint8));
    ftmap->Set(String::New("uint16"),   Pointer::WrapPointer((unsigned char *)&ffi_type_uint16));
    ftmap->Set(String::New("sint16"),   Pointer::WrapPointer((unsigned char *)&ffi_type_sint16));
    ftmap->Set(String::New("uint32"),   Pointer::WrapPointer((unsigned char *)&ffi_type_uint32));
    ftmap->Set(String::New("sint32"),   Pointer::WrapPointer((unsigned char *)&ffi_type_sint32));
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

Handle<Value> FFI::FFICall(const Arguments& args)
{
    HandleScope scope;
    
    if (args.Length() == 4) {
        Pointer *cif    = ObjectWrap::Unwrap<Pointer>(args[0]->ToObject());
        Pointer *fn     = ObjectWrap::Unwrap<Pointer>(args[1]->ToObject());
        Pointer *fnargs = ObjectWrap::Unwrap<Pointer>(args[2]->ToObject());
        Pointer *res    = ObjectWrap::Unwrap<Pointer>(args[3]->ToObject());
        
        // printf("FFI::FFICall: ffi_call(%p, %p, %p, %p)\n",
        //         (ffi_cif *)cif->GetPointer(),
        //         (void (*)(void))fn->GetPointer(),
        //         (void *)res->GetPointer(),
        //         (void **)fnargs->GetPointer());
        
        ffi_call(
            (ffi_cif *)cif->GetPointer(),
            (void (*)(void))fn->GetPointer(),
            (void *)res->GetPointer(),
            (void **)fnargs->GetPointer()
        );
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
}

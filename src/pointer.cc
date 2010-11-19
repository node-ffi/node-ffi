#include "ffi.h"

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
    NODE_SET_PROTOTYPE_METHOD(t, "putUInt8", PutUInt8);
    NODE_SET_PROTOTYPE_METHOD(t, "getUInt8", GetUInt8);
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
    NODE_SET_PROTOTYPE_METHOD(t, "_putPointer", PutPointerMethod);
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
        return THROW_ERROR_EXCEPTION("Must specify an offset");
    }
    
    return scope.Close(ret);
}

Handle<Value> Pointer::PutUInt8(const Arguments& args)
{    
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        int64_t val = args[0]->IntegerValue();
        
        if (val >= UINT8_MIN && val <= UINT8_MAX) {
            uint8_t cvt = (uint8_t)val;
            memcpy(ptr, &cvt, sizeof(uint8_t));
        }
        else {
            return THROW_ERROR_EXCEPTION("Value out of Range.");
        }
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(uint8_t));
    }

    return Undefined();
}

Handle<Value> Pointer::GetUInt8(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(uint8_t));
    }

    return scope.Close(Integer::New(*ptr));
}

Handle<Value> Pointer::PutInt8(const Arguments& args)
{    
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        int64_t val = args[0]->IntegerValue();
        
        if (val >= INT8_MIN && val <= INT8_MAX) {
            int8_t cvt = (int8_t)val;
            memcpy(ptr, &cvt, sizeof(int8_t));
        }
        else {
            return THROW_ERROR_EXCEPTION("Value out of Range.");
        }
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(int8_t));
    }

    return Undefined();
}

Handle<Value> Pointer::GetInt8(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr  = self->GetPointer();
    int8_t          val   = *((int8_t *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(int8_t));
    }

    return scope.Close(Integer::New(val));
}


Handle<Value> Pointer::PutInt16(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    // TODO: Exception handling here for out of range values
    if (args.Length() >= 1 && args[0]->IsNumber()) {
        int64_t val = args[0]->IntegerValue();
        
        if (val >= INT16_MIN && val <= INT16_MAX) {
            int16_t cvt = (int16_t)val;
            memcpy(ptr, &cvt, sizeof(int16_t));
        }
        else {
          return THROW_ERROR_EXCEPTION("Value out of Range.");
        }
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(int16_t));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetInt16(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    int16_t          val = *((int16_t *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(int16_t));
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
        int64_t val = args[0]->IntegerValue();
        
        if (val >= UINT16_MIN && val <= UINT16_MAX) {
            uint16_t cvt = (uint16_t)val;
            memcpy(ptr, &cvt, sizeof(uint16_t));
        }
        else {
          return THROW_ERROR_EXCEPTION("Value out of Range.");
        }
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(uint16_t));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetUInt16(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    unsigned short  val = *((uint16_t *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(uint16_t));
    }

    return scope.Close(Integer::New(val));
}

Handle<Value> Pointer::PutInt32(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        int64_t val = args[0]->IntegerValue();
        
        if (val >= INT32_MIN && val <= INT32_MAX) { // XXX: Will this ever be false?
            memcpy(ptr, &val, sizeof(int32_t));
        }
        else {
          return THROW_ERROR_EXCEPTION("Value out of Range.");
        }
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(int32_t));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetInt32(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    int32_t         val = *((int32_t *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(int32_t));
    }
    
    return scope.Close(Integer::New(val));
}

Handle<Value> Pointer::PutUInt32(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    if (args.Length() >= 1 && args[0]->IsNumber()) {
        int64_t val = args[0]->IntegerValue();
        
        if (val >= UINT32_MIN && val <= UINT32_MAX) { // XXX: Will this ever be false?
            memcpy(ptr, &val, sizeof(uint32_t));
        }
        else {
          return THROW_ERROR_EXCEPTION("Value out of Range.");
        }
    }
    if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
        self->MovePointer(sizeof(uint32_t));
    }
    
    return Undefined();
}

Handle<Value> Pointer::GetUInt32(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();
    uint32_t        val = *((uint32_t *)ptr);

    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(uint32_t));
    }

    return scope.Close(Integer::NewFromUnsigned(val));
}

Handle<Value> Pointer::PutInt64(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    // Have to do this because strtoll doesn't set errno to 0 on success :(
    errno = 0;
    
    if (args.Length() >= 1) {
        if (args[0]->IsNumber() || args[0]->IsString()) {
            int64_t val;
            
            if (args[0]->IsNumber()) {
                val = args[0]->IntegerValue();
            }
            else { // assumed args[0]->IsString() from condition above
                String::Utf8Value str(args[0]->ToString());
                val = STR_TO_INT64(*str);                
            }
            
            if (errno != ERANGE && (val >= INT64_MIN && val <= INT64_MAX)) {
                memcpy(ptr, &val, sizeof(int64_t));
            }
            else {
                return THROW_ERROR_EXCEPTION("Value out of Range.");
            }
        }
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
    char            buf[INTEGER_CONVERSION_BUFFER_SIZE];
    
    bzero(buf, INTEGER_CONVERSION_BUFFER_SIZE);
    snprintf(buf, INTEGER_CONVERSION_BUFFER_SIZE, "%lld", val);
    
    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(int64_t));
    }
    
    return scope.Close(String::New(buf));
}

Handle<Value> Pointer::PutUInt64(const Arguments& args)
{
    HandleScope     scope;
    Pointer         *self = ObjectWrap::Unwrap<Pointer>(args.This());
    unsigned char   *ptr = self->GetPointer();

    // Have to do this because strtoull doesn't set errno to 0 on success :(
    errno = 0;
    
    if (args.Length() >= 1) {
        if (args[0]->IsNumber() || args[0]->IsString()) {
            uint64_t val;
            
            // Convert everything to a string because it's easier this way
            String::Utf8Value str(args[0]->ToString());
            val = STR_TO_UINT64(*str);
            
            if ((*str)[0] != '-' && errno != ERANGE && (val >= UINT64_MIN && val <= UINT64_MAX)) {
                memcpy(ptr, &val, sizeof(uint64_t));
            }
            else {
                return THROW_ERROR_EXCEPTION("Value out of Range.");
            }
        }
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
    char            buf[INTEGER_CONVERSION_BUFFER_SIZE];
    
    bzero(buf, INTEGER_CONVERSION_BUFFER_SIZE);
    snprintf(buf, INTEGER_CONVERSION_BUFFER_SIZE, "%llu", val);
    
    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(uint64_t));
    }
    
    return scope.Close(String::New(buf));
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
    
    if (args.Length() == 1 && args[0]->IsBoolean() && args[0]->BooleanValue()) {
        self->MovePointer(sizeof(float));
    }
    
    return scope.Close(Number::New((double)val));
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
        if (args[0]->IsNull()) {
            *((unsigned char **)ptr) = NULL;
        }
        else {
            Pointer *obj = ObjectWrap::Unwrap<Pointer>(args[0]->ToObject());
            *((unsigned char **)ptr) = obj->GetPointer();            
        }
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
    unsigned char   *val = *((unsigned char **)ptr);
    
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
        args[0]->ToString()->WriteUtf8((char *)ptr);
        
        if (args.Length() == 2 && args[1]->IsBoolean() && args[1]->BooleanValue()) {
            self->MovePointer(args[0]->ToString()->Utf8Length());
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

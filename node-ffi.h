using namespace v8;
using namespace node;

class Pointer : public ObjectWrap {
    public:
        Pointer(unsigned char *ptr);
        ~Pointer();
        
        static void Initialize(Handle<Object> Target);
        static Handle<Object> WrapInstance(Pointer *inst);
        static Handle<Object> WrapPointer(unsigned char *ptr);
        unsigned char *GetPointer();
        void MovePointer(int bytes);
        void Alloc(size_t bytes);
        void Free();
        
    protected:
        static Handle<Value> New(const Arguments& args);
        static Handle<Value> Seek(const Arguments& args);
        static Handle<Value> PutByte(const Arguments& args);
        static Handle<Value> GetByte(const Arguments& args);
        static Handle<Value> PutInt8(const Arguments& args);
        static Handle<Value> GetInt8(const Arguments& args);
        static Handle<Value> PutInt16(const Arguments& args);
        static Handle<Value> GetInt16(const Arguments& args);
        static Handle<Value> PutUInt16(const Arguments& args);
        static Handle<Value> GetUInt16(const Arguments& args);
        static Handle<Value> PutInt32(const Arguments& args);
        static Handle<Value> GetInt32(const Arguments& args);
        static Handle<Value> PutUInt32(const Arguments& args);
        static Handle<Value> GetUInt32(const Arguments& args);
        static Handle<Value> PutFloat(const Arguments& args);
        static Handle<Value> GetFloat(const Arguments& args);
        static Handle<Value> PutDouble(const Arguments& args);
        static Handle<Value> GetDouble(const Arguments& args);
        static Handle<Value> PutPointerMethod(const Arguments& args);
        static Handle<Value> GetPointerMethod(const Arguments& args);
        static Handle<Value> PutCString(const Arguments& args);
        static Handle<Value> GetCString(const Arguments& args);
        static Handle<Value> IsNull(const Arguments& args);
        
        static Handle<Value> GetAddress(Local<String> name, const AccessorInfo& info);
        
    private:
        static Persistent<FunctionTemplate> pointer_template;
        static Handle<FunctionTemplate> MakeTemplate();
        unsigned char *m_ptr;
        unsigned int m_allocated;
};

class FFI : public ObjectWrap {
    public:
        static void InitializeStaticFunctions(Handle<Object> Target);
        static void InitializeBindings(Handle<Object> Target);
    
    protected:
        static Handle<Value> FFIPrepCif(const Arguments& args);
        static Handle<Value> FFICall(const Arguments& args);
};

class CallbackInfo : public ObjectWrap {
    public:
        CallbackInfo(Handle<Function> func, Handle<Object> fptr);
        ~CallbackInfo();
        static void Initialize(Handle<Object> Target);
        Handle<Value> GetPointerObject();
        
    protected:
        static Handle<Value> New(const Arguments& args);
        static Handle<Value> GetPointer(Local<String> name, const AccessorInfo& info);
        static void Invoke(ffi_cif *cif, void *retval, void **parameters, void *user_data);
        
    private:
        static Persistent<FunctionTemplate> callback_template;
        static Handle<FunctionTemplate> MakeTemplate();
        
        ffi_closure             *m_closure;
        Persistent<Function>    m_function;
        Handle<Object>          m_fptr;
};

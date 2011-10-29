#include "ffi.h"

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
    HandleScope scope;

    Handle<Value> argv[2];
    argv[0] = Pointer::WrapPointer((unsigned char *)retval);
    argv[1] = Pointer::WrapPointer((unsigned char *)parameters);

    TryCatch try_catch;

    self->m_function->Call(self->m_this, 2, argv);

    if (try_catch.HasCaught()) {
        FatalException(try_catch);
    }
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

    target->Set(String::NewSymbol("CallbackInfo"), t->GetFunction());

    // initialize our threaded invokation stuff
    g_mainthread = pthread_self();
    ev_async_init(&g_async, CallbackInfo::WatcherCallback);
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

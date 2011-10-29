#include "ffi.h"

ForeignCaller::ForeignCaller() {
}

ForeignCaller::~ForeignCaller() {
}

Persistent<FunctionTemplate> ForeignCaller::foreign_caller_template;

Handle<FunctionTemplate> ForeignCaller::MakeTemplate()
{
    HandleScope scope;
    Handle<FunctionTemplate> t = FunctionTemplate::New(New);

    Local<ObjectTemplate> inst = t->InstanceTemplate();
    inst->SetInternalFieldCount(1);

    return scope.Close(t);
}

void ForeignCaller::Initialize(Handle<Object> target)
{
    HandleScope scope;

    if (foreign_caller_template.IsEmpty()) {
        foreign_caller_template = Persistent<FunctionTemplate>::New(MakeTemplate());
    }

    Handle<FunctionTemplate> t = foreign_caller_template;

    NODE_SET_PROTOTYPE_METHOD(t, "exec", Exec);

    target->Set(String::NewSymbol("ForeignCaller"), t->GetFunction());
}

Handle<Value> ForeignCaller::New(const Arguments& args)
{
    HandleScope     scope;
    ForeignCaller   *self = new ForeignCaller();

    if (args.Length() == 5) {
        Pointer *cif    = ObjectWrap::Unwrap<Pointer>(args[0]->ToObject());
        Pointer *fn     = ObjectWrap::Unwrap<Pointer>(args[1]->ToObject());
        Pointer *fnargs = ObjectWrap::Unwrap<Pointer>(args[2]->ToObject());
        Pointer *res    = ObjectWrap::Unwrap<Pointer>(args[3]->ToObject());

        self->m_cif     = (ffi_cif *)cif->GetPointer();
        self->m_fn      = (void (*)(void))fn->GetPointer();
        self->m_res     = (void *)res->GetPointer();
        self->m_fnargs  = (void **)fnargs->GetPointer();

        self->m_async   = args[4]->BooleanValue();
    }
    else {
        return THROW_ERROR_EXCEPTION("Not enough arguments");
    }

    self->Wrap(args.This());
    return args.This();
}

Handle<Value> ForeignCaller::Exec(const Arguments& args)
{
    HandleScope     scope;
    ForeignCaller   *self = ObjectWrap::Unwrap<ForeignCaller>(args.This());

    if (self->m_async) {
        HandleScope scope;
        AsyncCallParams *p = new AsyncCallParams();

        // cuter way of doing this?
        p->cif  = self->m_cif;
        p->ptr  = self->m_fn;
        p->res  = self->m_res;
        p->args = self->m_fnargs;

        // get the events.EventEmitter constructor
        Local<Object> global = Context::GetCurrent()->Global();
        Local<Object> events = global->Get(String::NewSymbol("process"))->ToObject();
        Local<Function> emitterConstructor = Local<Function>::Cast(events->Get(String::NewSymbol("EventEmitter")));

        // construct a new process.Promise object
        p->emitter = Persistent<Object>::New(emitterConstructor->NewInstance());

        ev_ref(EV_DEFAULT_UC);
#if NODE_VERSION_AT_LEAST(0, 5, 4)
        eio_custom((void (*)(eio_req*))ForeignCaller::AsyncFFICall, EIO_PRI_DEFAULT, ForeignCaller::FinishAsyncFFICall, p);
#else
        eio_custom(ForeignCaller::AsyncFFICall, EIO_PRI_DEFAULT, ForeignCaller::FinishAsyncFFICall, p);
#endif

        return scope.Close(p->emitter);
    }
    else {
#if __OBJC__ || __OBJC2__
      @try {
#endif
        ffi_call(
            self->m_cif,
            self->m_fn,
            self->m_res,
            self->m_fnargs
        );
#if __OBJC__ || __OBJC2__
      } @catch (id ex) {
        return ThrowException(Pointer::WrapPointer((unsigned char *)ex));
      }
#endif
    }

    return Undefined();
}

int ForeignCaller::AsyncFFICall(eio_req *req)
{
    AsyncCallParams *p = (AsyncCallParams *)req->data;
    ffi_call(p->cif, p->ptr, p->res, p->args);
    return 0;
}

int ForeignCaller::FinishAsyncFFICall(eio_req *req)
{
    HandleScope scope;

    AsyncCallParams *p = (AsyncCallParams *)req->data;
    Local<Value> argv[1];

    argv[0] = Local<Value>::New(String::New("success"));

    // get a reference to the 'emit' function
    Local<Function> emit = Local<Function>::Cast(p->emitter->Get(String::NewSymbol("emit")));

    TryCatch try_catch;

    // emit a success event
    emit->Call(p->emitter, 1, argv);

    if (try_catch.HasCaught()) {
       FatalException(try_catch);
    }

    // unref the event loop (ref'd in FFICall)
    ev_unref(EV_DEFAULT_UC);

    // dispose of our persistent handle to the EventEmitter object
    p->emitter.Dispose();

    // free up our memory (allocated in FFICall)
    delete p;

    return 0;
}

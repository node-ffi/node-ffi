#include <stdlib.h>
#include <string.h>
#include "v8.h"
#include "node.h"
#include "node_buffer.h"
#include <nan.h>

#ifdef WIN32
#include <process.h>
#else
#include <pthread.h>
#endif // WIN32

using namespace v8;
using namespace node;

/*
 * Exported function with C naming and calling conventions.
 * Used by dynamic_library.js to test symbol lookup.
 * Never actually called.
 */

extern "C"
int
NODE_MODULE_EXPORT
ExportedFunction(int value)
{
  return value * 2;
}

namespace {

/*
 * Test struct definition used in the test harness functions below.
 */

typedef struct box {
  int width;
  int height;
} _box;

/*
 * Accepts a struct by value, and returns a struct by value.
 */

box double_box(box input) {
  box rtn;
  // modify the input box, ensure on the JS side that it's not altered
  input.width *= 2;
  input.height *= 2;
  rtn.width = input.width;
  rtn.height = input.height;
  return rtn;
}

/*
 * Accepts a box struct pointer, and returns a struct by value.
 */

box double_box_ptr(box *input) {
  box rtn;
  // modify the input box, ensure on the JS side that IT IS altered
  input->width *= 2;
  input->height *= 2;
  rtn.width = input->width;
  rtn.height = input->height;
  return rtn;
}

/*
 * Accepts a struct by value, and returns an int.
 */

int area_box(box input) {
  return input.width * input.height;
}

/*
 * Accepts a box pointer and returns an int.
 */

int area_box_ptr(box *input) {
  return input->width * input->height;
}

/*
 * Creates a box and returns it by value.
 */

box create_box(int width, int height) {
  box rtn = { width, height };
  return rtn;
}

/*
 * Creates a box that has the sum of the width and height for its own values.
 */

box add_boxes(box boxes[], int num) {
  box rtn = { 0, 0 };
  box cur;
  for (int i = 0; i < num; i++) {
    cur = boxes[i];
    rtn.width += cur.width;
    rtn.height += cur.height;
  }
  return rtn;
}

/*
 * Reads "ints" from the "input" array until a NULL pointer is found.
 * Returns the number of elements in the array.
 */

int *int_array(int *input) {
  int *array = input;
  while (*array != -1){
    *array = *array * 2;
    array++;
  }
  return input;
}

/*
 * Tests for passing a Struct that contains Arrays inside of it.
 */

struct arst {
  int num;
  double array[20];
};

struct arst array_in_struct (struct arst input) {
  struct arst rtn;
  rtn.num = input.num * 2;
  for (int i = 0; i < 20; i++) {
    rtn.array[i] = input.array[i] * 3.14;
  }
  return rtn;
}

/*
 * Tests for C function pointers.
 */

typedef int (*my_callback)(int);

my_callback callback_func (my_callback cb) {
  return cb;
}

/*
 * Hard-coded `strtoul` binding, for the benchmarks.
 *
 * args[0] - the string number to convert to a real Number
 * args[1] - a "buffer" instance to write into (the "endptr")
 * args[2] - the base (0 means autodetect)
 */

NAN_METHOD(Strtoul) {
  Nan::HandleScope();
  char buf[128];
  int base;
  char **endptr;

  info[0]->ToString()->WriteUtf8(buf);

  Local<Value> endptr_arg = info[0];
  endptr = (char **)Buffer::Data(endptr_arg.As<Object>());

  base = info[2]->Int32Value();

  unsigned long val = strtoul(buf, endptr, base);

  info.GetReturnValue().Set(Nan::New<Integer>((uint32_t)val));
}


// experiments for #72
typedef void (*cb)(void);

static cb callback = NULL;

NAN_METHOD(SetCb) {
  Nan::HandleScope();
  char *buf = Buffer::Data(info[0].As<Object>());
  callback = (cb)buf;
  info.GetReturnValue().SetUndefined();
}

NAN_METHOD(CallCb) {
  Nan::HandleScope();
  if (callback == NULL) {
    return Nan::ThrowError("you must call \"set_cb()\" first");
  } else {
    callback();
  }
  info.GetReturnValue().SetUndefined();
}

// Invoke callback from a native (non libuv) thread:
#ifdef WIN32
void invoke_callback(void* args) {
#else
void* invoke_callback(void* args) {
#endif // WIN32
  cb c = callback;
  if (c != NULL) {
    c();
  }
#ifndef WIN32
  return NULL;
#endif // WIN32
}

NAN_METHOD(CallCbFromThread) {
  Nan::HandleScope();
  if (callback == NULL) {
    return Nan::ThrowError("you must call \"set_cb()\" first");
  }
  else {
#ifdef WIN32
    _beginthread(&invoke_callback, 0, NULL);
#else
    pthread_t thread;
    pthread_create(&thread, NULL, &invoke_callback, NULL);
#endif // WIN32
  }
  info.GetReturnValue().SetUndefined();
}

void AsyncCbCall(uv_work_t *req) {
  cb c = (cb)req->data;
  c();
}

void FinishAsyncCbCall(uv_work_t *req) {
  // nothing
  delete req;
}

NAN_METHOD(CallCbAsync) {
  Nan::HandleScope();
  if (callback == NULL) {
    return Nan::ThrowError("you must call \"set_cb()\" first");
  } else {
    uv_work_t *req = new uv_work_t;
    req->data = (void *)callback;
    uv_queue_work(uv_default_loop(), req, AsyncCbCall, (uv_after_work_cb)FinishAsyncCbCall);
  }
  info.GetReturnValue().SetUndefined();
}


// Race condition in threaded callback invocation testing, see #153
void play_ping_pong (const char* (*callback) (const char*)) {
  const char * response;
  do {
    response = callback("ping");
  } while (strcmp(response, "pong") == 0);
}

void wrap_pointer_cb(char *data, void *hint) {
}

inline Local<Value> WrapPointer(char *ptr, size_t length) {
  Nan::EscapableHandleScope scope;
  return scope.Escape(Nan::NewBuffer(ptr, length, wrap_pointer_cb, NULL).ToLocalChecked());
}

inline Local<Value> WrapPointer(char *ptr) {
  return WrapPointer(ptr, 0);
}

void Initialize(Handle<Object> target) {
  Nan::HandleScope();

#if WIN32
  // initialize "floating point support" on Windows?!?!
  // (this is some serious bullshit...)
  // http://support.microsoft.com/kb/37507
  float x = 2.3f;
#endif

  // atoi and abs here for testing purposes
  target->Set(Nan::New<String>("atoi").ToLocalChecked(), WrapPointer((char *)atoi));

  // Windows has multiple `abs` signatures, so we need to manually disambiguate
  int (*absPtr)(int)(abs);
  target->Set(Nan::New<String>("abs").ToLocalChecked(), WrapPointer((char *)absPtr));

  // sprintf pointer; used in the varadic tests
  target->Set(Nan::New<String>("sprintf").ToLocalChecked(), WrapPointer((char *)sprintf));

  // hard-coded `strtoul` binding, for the benchmarks
  Nan::Set(target, Nan::New<String>("strtoul").ToLocalChecked(),
    Nan::New<FunctionTemplate>(Strtoul)->GetFunction());

  Nan::Set(target, Nan::New<String>("set_cb").ToLocalChecked(),
    Nan::New<FunctionTemplate>(SetCb)->GetFunction());
  Nan::Set(target, Nan::New<String>("call_cb").ToLocalChecked(),
    Nan::New<FunctionTemplate>(CallCb)->GetFunction());
  Nan::Set(target, Nan::New<String>("call_cb_from_thread").ToLocalChecked(),
    Nan::New<FunctionTemplate>(CallCbFromThread)->GetFunction());
  Nan::Set(target, Nan::New<String>("call_cb_async").ToLocalChecked(),
    Nan::New<FunctionTemplate>(CallCbAsync)->GetFunction());

  // also need to test these custom functions
  target->Set(Nan::New<String>("double_box").ToLocalChecked(), WrapPointer((char *)double_box));
  target->Set(Nan::New<String>("double_box_ptr").ToLocalChecked(), WrapPointer((char *)double_box_ptr));
  target->Set(Nan::New<String>("area_box").ToLocalChecked(), WrapPointer((char *)area_box));
  target->Set(Nan::New<String>("area_box_ptr").ToLocalChecked(), WrapPointer((char *)area_box_ptr));
  target->Set(Nan::New<String>("create_box").ToLocalChecked(), WrapPointer((char *)create_box));
  target->Set(Nan::New<String>("add_boxes").ToLocalChecked(), WrapPointer((char *)add_boxes));
  target->Set(Nan::New<String>("int_array").ToLocalChecked(), WrapPointer((char *)int_array));
  target->Set(Nan::New<String>("array_in_struct").ToLocalChecked(), WrapPointer((char *)array_in_struct));
  target->Set(Nan::New<String>("callback_func").ToLocalChecked(), WrapPointer((char *)callback_func));
  target->Set(Nan::New<String>("play_ping_pong").ToLocalChecked(), WrapPointer((char *)play_ping_pong));
}

} // anonymous namespace

NODE_MODULE(ffi_tests, Initialize);

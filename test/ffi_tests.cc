#include <stdlib.h>
#include "v8.h"
#include "node.h"
#include "node_buffer.h"

#ifdef _WIN32
  #define snprintf _snprintf_s
#endif

using namespace v8;
using namespace node;

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
 * Hard-coded `strtoul` binding, for the benchmarks.
 *
 * args[0] - the string number to convert to a real Number
 * args[1] - a "buffer" instance to write into (the "endptr")
 * args[2] - the base (0 means autodetect)
 */

Handle<Value> Strtoul(const Arguments &args) {
  HandleScope scope;
  char buf[128];
  int base;
  char **endptr;

  args[0]->ToString()->WriteUtf8(buf);

  Local<Value> endptr_arg = args[0];
  endptr = (char **)Buffer::Data(endptr_arg.As<Object>());

  base = args[2]->Int32Value();

  unsigned long val = strtoul(buf, endptr, base);

  return scope.Close(Integer::NewFromUnsigned(val));
}


// experiments for #72
typedef void (*cb)(void);

static cb callback = NULL;

Handle<Value> SetCb(const Arguments &args) {
  HandleScope scope;
  char *buf = Buffer::Data(args[0].As<Object>());
  callback = (cb)buf;
  return scope.Close(Undefined());
}

Handle<Value> CallCb(const Arguments &args) {
  if (callback == NULL) {
    return ThrowException(Exception::Error(String::New("you must call \"set_cb()\" first")));
  } else {
    callback();
  }
  return Undefined();
}




void wrap_pointer_cb(char *data, void *hint) {
  //fprintf(stderr, "wrap_pointer_cb\n");
}

Handle<Object> WrapPointer(char *ptr) {
  void *user_data = NULL;
  size_t length = 0;
  Buffer *buf = Buffer::New(ptr, length, wrap_pointer_cb, user_data);
  return buf->handle_;
}

void Initialize(Handle<Object> target) {
  HandleScope scope;

  // atoi and abs here for testing purposes
  target->Set(String::NewSymbol("atoi"), WrapPointer((char *)atoi));

  // Windows has multiple `abs` signatures, so we need to manually disambiguate
  int (*absPtr)(int)(abs);
  target->Set(String::NewSymbol("abs"),  WrapPointer((char *)absPtr));

  // snprintf pointer; used in the varadic tests
#ifdef _WIN32
  // Windows has multiple `_snprintf_s` signatures, so we need to manually disambiguate
  int (*snprintfPtr)(char*, size_t, size_t, const char*)(snprintf);
  target->Set(String::NewSymbol("snprintf"),  WrapPointer((char *)snprintfPtr));
#else
  target->Set(String::NewSymbol("snprintf"),  WrapPointer((char *)snprintf));
#endif
  
  // hard-coded `strtoul` binding, for the benchmarks
  NODE_SET_METHOD(target, "strtoul", Strtoul);

  NODE_SET_METHOD(target, "set_cb", SetCb);
  NODE_SET_METHOD(target, "call_cb", CallCb);

  // also need to test these custom functions
  target->Set(String::NewSymbol("double_box"), WrapPointer((char *)double_box));
  target->Set(String::NewSymbol("double_box_ptr"), WrapPointer((char *)double_box_ptr));
  target->Set(String::NewSymbol("area_box"), WrapPointer((char *)area_box));
  target->Set(String::NewSymbol("area_box_ptr"), WrapPointer((char *)area_box_ptr));
  target->Set(String::NewSymbol("create_box"), WrapPointer((char *)create_box));
  target->Set(String::NewSymbol("add_boxes"), WrapPointer((char *)add_boxes));
}

} // anonymous namespace

NODE_MODULE(ffi_tests, Initialize);

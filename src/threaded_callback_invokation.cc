#include <node.h>
#include <node_version.h>
#include "ffi.h"

#if !NODE_VERSION_AT_LEAST(0, 9, 0)
  #include "uv_cond_compat.c"
#endif

ThreadedCallbackInvokation::ThreadedCallbackInvokation(callback_info *cbinfo, void *retval, void **parameters) {
  m_cbinfo = cbinfo;
  m_retval = retval;
  m_parameters = parameters;

  uv_mutex_init(&m_mutex);
  uv_mutex_lock(&m_mutex);
  uv_cond_init(&m_cond);
}

ThreadedCallbackInvokation::~ThreadedCallbackInvokation() {
  uv_mutex_unlock(&m_mutex);
  uv_cond_destroy(&m_cond);
  uv_mutex_destroy(&m_mutex);
}

void ThreadedCallbackInvokation::SignalDoneExecuting() {
  uv_mutex_lock(&m_mutex);
  uv_cond_signal(&m_cond);
  uv_mutex_unlock(&m_mutex);
}

void ThreadedCallbackInvokation::WaitForExecution() {
  uv_cond_wait(&m_cond, &m_mutex);
}

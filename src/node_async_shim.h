/**
 * eio_custom() vs. uv_queue_work() file.
 * Original gist: https://gist.github.com/1368935
 *
 * Copyright (c) 2011-2012, Nathan Rajlich <nathan@tootallnate.net>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

#include <node.h>
#include <node_version.h>

/* Node Thread Pool version compat */
#if NODE_VERSION_AT_LEAST(0, 5, 6)
  #define BEGIN_ASYNC(_data, async, after) \
    uv_work_t *_req = new uv_work_t; \
    _req->data = _data; \
    uv_queue_work(uv_default_loop(), _req, async, after);
  typedef void async_rtn;
  #define RETURN_ASYNC
  #define RETURN_ASYNC_AFTER delete req;
#else
  #define BEGIN_ASYNC(data, async, after) \
    ev_ref(EV_DEFAULT_UC); \
    eio_custom(async, EIO_PRI_DEFAULT, after, data);
  typedef int async_rtn;
  typedef eio_req uv_work_t;
  #define RETURN_ASYNC return 0;
  #define RETURN_ASYNC_AFTER \
    ev_unref(EV_DEFAULT_UC); \
    RETURN_ASYNC;
#endif

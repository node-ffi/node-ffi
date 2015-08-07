/**
 * @file Minimal emulation of POSIX dlopen/dlsym/dlclose on Windows.
 * @license Public domain.
 *
 * This code works fine for the common scenario of loading a
 * specific DLL and calling one (or more) functions within it.
 * No attempt is made to emulate POSIX symbol table semantics.
 */

#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif

#include <windows.h>

#include "dlfcn.h"

/**
 * Open DLL, returning a handle.
 */

void*
dlopen(
    const char *file,   /** DLL filename. */
    int mode            /** mode flags (ignored). */
)
{
    UNREFERENCED_PARAMETER(mode);
    return (void*) LoadLibraryA(file);
}

/**
 * Close DLL.
 */

int
dlclose(
    void* handle        /** Handle from dlopen(). */
)
{
    return !FreeLibrary((HMODULE) handle);
}

/**
 * Look up symbol exported by DLL.
 */

void*
dlsym(
    void* handle,       /** Handle from dlopen(). */
    const char* name    /** Name of exported symbol. */
)
{
    return (void*) GetProcAddress((HMODULE) handle, name);
}

/**
 * Return message describing last error.
 */

char*
dlerror(void)
{
    /* "Ken Thompson has an automobile which he helped design..." */
    return "?";
}

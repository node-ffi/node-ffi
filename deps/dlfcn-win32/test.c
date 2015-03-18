/*
 * dlfcn-win32
 * Copyright (c) 2007-2009 Ramiro Polla
 * Copyright (c) 2014      Tiancheng "Timothy" Gu
 *
 * dlfcn-win32 is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * dlfcn-win32 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with dlfcn-win32; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

#ifdef _DEBUG
#define _CRTDBG_MAP_ALLOC
#include <stdlib.h>
#include <crtdbg.h>
#endif
#include <stdio.h>
#include "dlfcn.h"

/* If these dlclose's fails, we don't care as the handles are going to be
   closed eventually when the program ends. */
#define CLOSE_LIB    dlclose( library )
#define CLOSE_GLOBAL dlclose( global  )

#define RETURN_ERROR printf("From line %d\n", __LINE__); return 1

#define RUNFUNC do { \
                    ret = function (); \
                    if( ret != 0) {    \
                        CLOSE_LIB;     \
                        CLOSE_GLOBAL;  \
                        RETURN_ERROR;  \
                    }                  \
                } while( 0 )
                        

/* This is what this test does:
 * - Open library with RTLD_GLOBAL
 * - Get global object
 * - Get symbol from library through library object <- works
 * - Run function if it worked
 * - Get nonexistent symbol from library through library object <- fails
 * - Get symbol from library through global object  <- works
 * - Run function if it worked
 * - Get nonexistent symbol from library through global object <- fails
 * - Close library
 * - Open library with RTLD_LOCAL
 * - Get symbol from library through library object <- works
 * - Run function if it worked
 * - Get nonexistent symbol from library through library object <- fails
 * - Get local symbol from library through global object  <- fails
 * - Get nonexistent local symbol from library through global object <- fails
 * - Open library again (without closing it first) with RTLD_GLOBAL
 * - Get symbol from library through global object  <- works
 * - Get nonexistent symbol from library through global object <- fails
 * - Close library
 * - Close global object
 *
 * If one test fails, the program terminates itself.
 */

int main()
{
    void *global;
    void *library;
    char *error;
    int (*function)( void );
    int (*printf_local)( const char * );
    int (*nonexistentfunction)( void );
    int ret;

#ifdef _DEBUG
    _CrtSetReportMode(_CRT_WARN, _CRTDBG_MODE_FILE);
    _CrtSetReportFile(_CRT_WARN, _CRTDBG_FILE_STDOUT);
    _CrtSetReportMode(_CRT_ERROR, _CRTDBG_MODE_FILE);
    _CrtSetReportFile(_CRT_ERROR, _CRTDBG_FILE_STDOUT);
    _CrtSetReportMode(_CRT_ASSERT, _CRTDBG_MODE_FILE);
    _CrtSetReportFile(_CRT_ASSERT, _CRTDBG_FILE_STDOUT);
#endif

    library = dlopen( "testdll.dll", RTLD_GLOBAL );
    if( !library )
    {
        error = dlerror( );
        printf( "ERROR\tCould not open library globally: %s\n", error ? error : "" );
        RETURN_ERROR; 
    }
    else
        printf( "SUCCESS\tOpened library globally: %p\n", library );

    global = dlopen( 0, RTLD_GLOBAL );
    if( !global )
    {
        error = dlerror( );
        printf( "ERROR\tCould not open global handle: %s\n", error ? error : "" );
        CLOSE_LIB;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tGot global handle: %p\n", global );

    printf_local = dlsym(global, "printf");
    if (!printf_local)
    {
        error = dlerror();
        printf("ERROR\tCould not get symbol from global handle: %s\n",
            error ? error : "");
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf("SUCCESS\tGot symbol from global handle: %p\n", printf_local);
    printf_local("Hello world from local printf!\n");

    function = dlsym( library, "function" );
    if( !function )
    {
        error = dlerror( );
        printf( "ERROR\tCould not get symbol from library handle: %s\n",
                error ? error : "" );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tGot symbol from library handle: %p\n", function );

    RUNFUNC;

    nonexistentfunction = dlsym( library, "nonexistentfunction" );
    if( nonexistentfunction )
    {
        error = dlerror( );
        printf( "ERROR\tGot nonexistent symbol from library handle: %p\n", nonexistentfunction );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else {
        error = dlerror( );
        printf( "SUCCESS\tCould not get nonexistent symbol from library handle: %s\n",
                error ? error : "" );
    }

    function = dlsym( global, "function" );
    if( !function )
    {
        error = dlerror( );
        printf( "ERROR\tCould not get symbol from global handle: %s\n",
                error ? error : "" );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tGot symbol from global handle: %p\n", function );

    RUNFUNC;

    nonexistentfunction = dlsym( global, "nonexistentfunction" );
    if( nonexistentfunction )
    {
        error = dlerror( );
        printf( "ERROR\tGot nonexistent symbol from global handle: %p\n", nonexistentfunction );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else {
        error = dlerror( );
        printf( "SUCCESS\tCould not get nonexistent symbol from global handle: %s\n",
                error ? error : "" );
    }

    ret = dlclose( library );
    if( ret )
    {
        error = dlerror( );
        printf( "ERROR\tCould not close library: %s\n", error ? error : "" );
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tClosed library.\n" );

    library = dlopen( "testdll.dll", RTLD_LOCAL );
    if( !library )
    {
        error = dlerror( );
        printf( "ERROR\tCould not open library locally: %s\n", error ? error : "" );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tOpened library locally: %p\n", library );

    function = dlsym( library, "function" );
    if( !function )
    {
        error = dlerror( );
        printf( "ERROR\tCould not get symbol from library handle: %s\n",
                error ? error : "" );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tGot symbol from library handle: %p\n", function );

    RUNFUNC;

    nonexistentfunction = dlsym( library, "nonexistentfunction" );
    if( nonexistentfunction )
    {
        error = dlerror( );
        printf( "ERROR\tGot nonexistent symbol from library handle: %p\n", nonexistentfunction );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else {
        error = dlerror( );
        printf( "SUCCESS\tCould not get nonexistent symbol from library handle: %s\n",
                error ? error : "" );
    }

    function = dlsym( global, "function" );
    if( function )
    {
        error = dlerror( );
        printf( "ERROR\tGot local symbol from global handle: %s @ %p\n",
                error ? error : "", function );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tDid not get local symbol from global handle.\n" );

    nonexistentfunction = dlsym( global, "nonexistentfunction" );
    if( nonexistentfunction )
    {
        error = dlerror( );
        printf( "ERROR\tGot nonexistent local symbol from global handle: %p\n", nonexistentfunction );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else {
        error = dlerror( );
        printf( "SUCCESS\tDid not get nonexistent local symbol from global handle: %s\n",
                error ? error : "" );
    }

    library = dlopen( "testdll.dll", RTLD_GLOBAL );
    if( !library )
    {
        error = dlerror( );
        printf( "ERROR\tCould not open library globally without closing it first: %s\n", error ? error : "" );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tOpened library globally without closing it first: %p\n", library );

    function = dlsym( global, "function" );
    if( !function )
    {
        error = dlerror( );
        printf( "ERROR\tCould not get symbol from global handle: %s\n",
                error ? error : "" );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tGot symbol from global handle: %p\n", function );

    RUNFUNC;

    nonexistentfunction = dlsym( global, "nonexistentfunction" );
    if( nonexistentfunction )
    {
        error = dlerror( );
        printf( "ERROR\tGot nonexistent symbol from global handle: %p\n", nonexistentfunction );
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else {
        error = dlerror( );
        printf( "SUCCESS\tCould not get nonexistent symbol from global handle: %s\n",
                error ? error : "" );
    }

    function = dlsym(global, "printf");
    if (!function)
    {
        error = dlerror();
        printf("ERROR\tCould not get symbol from global handle: %s\n",
            error ? error : "");
        CLOSE_LIB;
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf("SUCCESS\tGot symbol from global handle: %p\n", function);

    ret = dlclose( library );
    if( ret )
    {
        error = dlerror( );
        printf( "ERROR\tCould not close library: %s\n", error ? error : "" );
        CLOSE_GLOBAL;
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tClosed library.\n" );

    ret = dlclose( global );
    if( ret )
    {
        error = dlerror( );
        printf( "ERROR\tCould not close global handle: %s\n", error ? error : "" );
        RETURN_ERROR;
    }
    else
        printf( "SUCCESS\tClosed global handle.\n" );

#ifdef _DEBUG
    _CrtDumpMemoryLeaks();
#endif
    return 0;
}

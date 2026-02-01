import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/dashboard
  if (pathname === '/admin/dashboard') {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            const cookies = [];
            request.cookies.getAll().forEach(cookie => {
              cookies.push({ name: cookie.name, value: cookie.value });
            });
            return cookies;
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // If no user, redirect to login
      if (!user) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      return response;
    } catch (error) {
      // If there's any error checking auth, redirect to login
      console.error('Auth error in middleware:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard'],
};

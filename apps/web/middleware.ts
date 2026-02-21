import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/immersive'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('lavision_access_token')?.value;
  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/immersive/:path*']
};

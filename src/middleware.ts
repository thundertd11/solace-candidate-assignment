import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (
    (url.pathname === '/' && !url.searchParams.has('limit')) ||
    !url.searchParams.has('page')
  ) {
    url.searchParams.set('limit', '10');
    url.searchParams.set('page', '1');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};

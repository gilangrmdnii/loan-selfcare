import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE
  const pathname = request.nextUrl.pathname

  console.log('isMaintenance:', isMaintenance)
  console.log('pathname:', pathname)

  if (isMaintenance === "true" && pathname !== '/maintenance') {
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }

  if (isMaintenance === "false" && pathname === '/maintenance') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
}

import { NextResponse } from "next/server"

export function middleware(request) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  // Protected paths
  const protectedPaths = ["/admin"]

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  )

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
}

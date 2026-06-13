import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function proxy(request) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  const protectedPaths = ["/admin"]
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  )

  // 1. Handle /login redirect (Only if valid AND verified)
  if (pathname === "/login" && token) {
    try {
      const { payload } = await jwtVerify(token, SECRET)
      if (payload.verified === true) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
    } catch (err) {
      // Token invalid, stay on login page
    }
  }

  // 2. Handle Protected Paths
  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    try {
      const { payload } = await jwtVerify(token, SECRET)

      if (payload.verified !== true) {
        return NextResponse.redirect(new URL("/verify", request.url))
      }

      // If verified, proceed
      return NextResponse.next()
    } catch (err) {
      // Invalid token or expired
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
}

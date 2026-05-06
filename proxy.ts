import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import path from "path";
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicPage = pathname === "/" || pathname === "signin" || pathname === "signup";
  const isPublicApi = pathname.startsWith("/api/auth") || pathname.startsWith("/api/signup");

  if (isPublicApi || isPublicPage) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    if (pathname.startsWith("/api")) {
      NextResponse.json({ success: false, error: "Unauthorized" });
    } else {
      const url = new URL("/", req.url);

      NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

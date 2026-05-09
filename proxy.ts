import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicPage = pathname === "/" || pathname === "/signin" || pathname === "/signup";
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
      return NextResponse.json({ success: false, error: "Unauthorized access", status: 401 }, { status: 401 });
    } else {
      const url = new URL("/", req.url);

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

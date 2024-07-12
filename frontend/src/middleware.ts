import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const forwardedHost =
    request.headers.get("x-forwarded-host") || request.nextUrl.host;
  const forwardedProto =
    request.headers.get("x-forwarded-proto") || request.nextUrl.protocol;
  const origin = process.env.API_ORIGIN || `${forwardedProto}://${forwardedHost}`;

  try {
    const cookies = request.headers.get("cookie");
    if (cookies === "") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = await fetch(`${origin}/api/auth/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies || "",
      },
    });

    if (response.ok) {
      const setCookieHeader = response.headers.get("set-cookie");
      const res = NextResponse.next();
      if (setCookieHeader !== null) {
        res.headers.append("Set-Cookie", setCookieHeader);
      }

      return res;
    } else if (response.status === 401) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/error", request.url));
    }
  } catch (error) {
    console.error("Error checking user access:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};

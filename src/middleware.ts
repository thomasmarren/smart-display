import { NextResponse } from "next/server";

export function middleware(request: any) {
  const xForwardedFor = request.headers.get("x-forwarded-for");

  if (xForwardedFor !== process.env.NEXT_PUBLIC_IP) {
    return new Response("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

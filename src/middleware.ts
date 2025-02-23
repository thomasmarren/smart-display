import { NextResponse } from "next/server";

export function middleware(request: any) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  //   const ip = xForwardedFor ? xForwardedFor.split(",")[0].trim() : null;

  console.log("request.ip", request.ip);
  console.log("xForwardedFor", xForwardedFor);

  //   if (ip && blockedIps.includes(ip)) {
  //     return new Response("Forbidden", { status: 403 });
  //   }

  return NextResponse.next();
}

// Apply this middleware to all routes.
export const config = {
  matcher: "/:path*",
};

import { verifyAuth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(req: NextRequest) {

  const token = req.cookies.get("user-token")?.value

  const verifiedToken = token && await verifyAuth(token).catch(() => {
    console.log("error")
  })

  if (req.nextUrl.pathname.startsWith("/admin") && !verifiedToken) {
    return
  }

  const url = req.url

  if (req.url.includes("/admin") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard/video", url))
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/admin", url))
  }
}

export const config = {
  matcher: ["/dashboard/video", "/dashboard/:path*", "/admin"]
}
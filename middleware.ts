// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userId = req.cookies.get("userId")?.value;

  // Clone the URL so we can safely modify it
  const url = req.nextUrl.clone();

  // If there's no token or userId, redirect to homepage or login
  if (!token || !userId) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  try {
    // Validate user using your backend API (proxy validation)
    const res = await fetch(
      `https://api-dokan-backend.onrender.com/api/v1/users/profile/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      // Token expired, invalid, etc.
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const data = await res.json();
    const user = data?.user;

    // Example: restrict non-admin users from /dashboard routes
    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      user?.role !== "admin"
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // ✅ If everything is valid, continue
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware validation error:", err);
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

// Only run this middleware on specific routes
export const config = {
  matcher: ["/dashboard/:path*"], // protect all dashboard pages
};

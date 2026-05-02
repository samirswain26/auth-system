// // import { NextResponse } from "next/server";
// // import { NextRequest } from "next/server";
// // import jwt from "jsonwebtoken";

// // export function middleware(req: NextRequest) {
// //   const token = req.cookies.get("token")?.value;

// //   if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
// //     return NextResponse.redirect(new URL("/login", req.url));
// //   }

// //   try {
// //     jwt.verify(token!, process.env.JWT_SECRET!);
// //   } catch {
// //     return NextResponse.redirect(new URL("/login", req.url));
// //   }

// //   return NextResponse.next();
// // }


// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// // All routes listed here require a valid login session
// const PROTECTED_ROUTES = ["/homepage"];

// // Routes only guests can access — logged-in users get bounced to /homepage
// const AUTH_ROUTES = ["/login", "/signup"];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;

//   const isProtected = PROTECTED_ROUTES.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isAuthRoute = AUTH_ROUTES.some((route) =>
//     pathname.startsWith(route)
//   );

//   // Helper: verify token and return decoded payload or null
//   const getDecodedToken = () => {
//     if (!token) return null;
//     try {
//       return jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
//     } catch {
//       return null;
//     }
//   };

//   const decoded = getDecodedToken();
//   console.log("decoded token is : ", decoded)
//   const isLoggedIn = decoded !== null;

//   // 1. Trying to access a protected route without a valid session → redirect to login
//   if (isProtected && !isLoggedIn) {
//     const loginUrl = new URL("/login", req.url);
//     // Preserve the original URL so we can redirect back after login (optional)
//     loginUrl.searchParams.set("next", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // 2. Already logged in and trying to hit /login or /signup → redirect to app
//   if (isAuthRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL("/homepage", req.url));
//   }

//   // 3. All other requests — pass through
//   return NextResponse.next();
// }

// export const config = {
//   // Run middleware on all routes except Next.js internals and static files
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
// };

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface DecodedToken {
  userId: string; 
  iat: number;
  exp: number;
}

type AuthResult =
  | { success: true; decoded: DecodedToken }
  | { success: false; status: 401; message: string };

export async function verifyAuth(): Promise<AuthResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, status: 401, message: "Unauthorized — no token" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return { success: true, decoded };
  } catch {
    return { success: false, status: 401, message: "Unauthorized — invalid or expired token" };
  }
}
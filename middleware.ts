import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ROUTES } from "./app/constants/routes";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isLoginPage = req.nextUrl.pathname === ROUTES.LOGIN;

    
    if (isLoginPage && token) {
      const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || "/dashboard";
      return NextResponse.redirect(new URL(callbackUrl, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
     
        return true;
      },
    },
    pages: {
      signIn: ROUTES.LOGIN,
    },
  }
);

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
  ],
};
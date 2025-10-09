import { NextRequest, NextResponse } from "next/server";
import { APP_KEY } from "./constants/app";
import {
  DASHBOARD_ROUTER,
  LOGIN_ROUTER,
  PUBLIC_ROUTER,
} from "./constants/appRouter";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTER.includes(path);

  const cookie = req.cookies.get(APP_KEY.REFRESH_TOKEN)?.value;

  if (!isPublicRoute && !cookie) {
    return NextResponse.redirect(new URL(LOGIN_ROUTER, req.nextUrl));
  }

  if ((isPublicRoute && cookie) || (cookie && path === "/")) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTER, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|.*\\.(?:png|jpg|jpeg|svg|webp|ico|webmanifest|txt|xml)$).*)",
  ],
};

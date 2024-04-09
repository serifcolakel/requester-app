import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: [
    "/api",
    "/",
    "/login",
    "/register",
    "/reset-password",
    "/_next",
    "/favicon.ico",
    "/vercel.svg",
    "/next.svg",
  ],
  publicRoutes: ["/api/test"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/family(.*)",
  "/transactions(.*)",
  "/budgets(.*)",
  "/accounts(.*)",
  "/goals(.*)",
  "/analytics(.*)",
  "/assistant(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
    "/((?!_next|.*\\..*).*)",
  ],
};

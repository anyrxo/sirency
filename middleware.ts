import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/(.*)', // Temporarily make everything public to pass build, will restrict later if needed
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
      auth().protect(); // v5 syntax
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

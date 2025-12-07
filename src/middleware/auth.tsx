import { createMiddleware } from "@tanstack/react-start";
import { isAuthenticated } from "../utils/auth";
import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthProvider } from "../context/AuthContext";

export const authMiddleware = createMiddleware().server(
  async ({ next, context }: any) => {
    const isAuthed = isAuthenticated();
    const pathname = context.request.url;

    // Root path logic
    if (pathname === "/") {
      if (isAuthed) {
        throw redirect({ to: "/terminal" });
      }
      return next();
    }

    // Protected paths
    if (!isAuthed) {
      throw redirect({ to: "/" });
    }

    return next();
  },
);

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
});

export function authGuard({ context, navigate }: any) {
  const isAuthed = isAuthenticated();

  if (!isAuthed) {
    throw navigate({ to: "/" });
  }
}

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { authGuard } from "../middleware/auth";

export const Route = createFileRoute("/__protected")({
  beforeLoad: authGuard,
  component: () => <Outlet />,
});

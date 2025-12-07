import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useClientAuthGuard } from "../middleware/auth";

export const Route = createFileRoute("/__protected")({
  beforeLoad: useClientAuthGuard,
  component: () => <Outlet />,
});

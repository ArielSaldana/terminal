import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "../../middleware/auth";

export const Route = createFileRoute("/terminal/")({
  server: {
    middleware: [authMiddleware],
  },
  // beforeLoad: authGuard,
  component: TerminalPage,
  ssr: false,
});

function TerminalPage() {
  return <div>Terminal - Protected Content</div>;
}

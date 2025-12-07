import { createFileRoute } from "@tanstack/react-router";
import { authGuard } from "../../middleware/auth";

export const Route = createFileRoute("/terminal/")({
  beforeLoad: authGuard,
  component: TerminalPage,
});

function TerminalPage() {
  return <div>Terminal - Protected Content</div>;
}

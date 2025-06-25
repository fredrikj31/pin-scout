import { createFileRoute } from "@tanstack/react-router";
import { EventButton } from "../components/EventButton";
import { useAuth } from "../providers/auth/useAuth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const auth = useAuth();

  return (
    <div className="p-2">
      <h1 className="text-xl">Hello {auth.user?.email}</h1>
      <EventButton />
    </div>
  );
}

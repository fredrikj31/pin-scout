import { createFileRoute, redirect } from "@tanstack/react-router";
import { EventButton } from "../components/EventButton";
import { useAuth } from "../providers/auth/useAuth";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
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

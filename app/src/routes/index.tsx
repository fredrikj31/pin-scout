import { createFileRoute } from "@tanstack/react-router";
import { EventButton } from "../components/EventButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h1 className="text-xl">Hello World</h1>
      <EventButton />
    </div>
  );
}

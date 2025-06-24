import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FirebaseProvider } from "../providers/firebase/Provider";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <FirebaseProvider>
        <Outlet />
      </FirebaseProvider>
      <TanStackRouterDevtools />
    </>
  ),
});

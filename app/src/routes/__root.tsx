import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FirebaseProvider } from "../providers/firebase/Provider";
import "../index.css";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <FirebaseProvider>
          <Outlet />
        </FirebaseProvider>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  ),
});

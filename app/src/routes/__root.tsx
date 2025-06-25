import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../index.css";
import { FirebaseProvider } from "../providers/firebase/Provider";
import { AuthProvider } from "../providers/auth/Provider";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <FirebaseProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </FirebaseProvider>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  ),
});

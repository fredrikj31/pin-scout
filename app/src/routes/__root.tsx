import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../index.css";
import { FirebaseProvider } from "../providers/firebase/Provider";
import { AuthProvider } from "../providers/auth/Provider";
import type { FirebaseProviderValue } from "../providers/firebase/types";
import type { AuthProviderValue } from "../providers/auth/types";

const queryClient = new QueryClient();

interface MyRouterContext {
  firebase: FirebaseProviderValue;
  auth: AuthProviderValue;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
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

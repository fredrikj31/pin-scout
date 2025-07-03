import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { FirebaseProvider } from "./providers/firebase/Provider";
import { AuthProvider } from "./providers/auth/Provider";
import "./index.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/Home/home";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FirebaseProvider>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </AuthProvider>
        </FirebaseProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

import type { JSX } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../providers/auth/useAuth";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (user === undefined) {
    return <span>Loading...</span>;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

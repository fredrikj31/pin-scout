import { useContext } from "react";
import type { AuthProviderValue } from "./types";
import { AuthContext } from "./context";

export const useAuth = (): AuthProviderValue => {
  const context = useContext<AuthProviderValue | null>(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContext");
  }
  return context;
};

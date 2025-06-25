import { createContext } from "react";
import type { AuthProviderValue } from "./types";

export const AuthContext = createContext<AuthProviderValue | null>(null);

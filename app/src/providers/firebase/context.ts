import { createContext } from "react";
import type { FirebaseProviderValue } from "./types";

export const FirebaseContext = createContext<FirebaseProviderValue | null>(
  null
);

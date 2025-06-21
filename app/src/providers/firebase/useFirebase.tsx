import { useContext } from "react";
import type { FirebaseProviderValue } from "./types";
import { FirebaseContext } from "./context";

export const useFirebase = (): FirebaseProviderValue => {
  const context = useContext<FirebaseProviderValue | null>(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseContext");
  }
  return context;
};

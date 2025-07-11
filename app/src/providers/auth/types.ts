import type { User } from "firebase/auth";
import type { signupUser } from "~/api/signupUser/signupUser";

export interface AuthProviderValue {
  user: User | null | undefined; // User = logged in || null = logged out || undefined = loading
  login: ({ email, password }: { email: string; password: string }) => void;
  signup: (data: Omit<Parameters<typeof signupUser>[0], "auth" | "firestore">) => void;
  logout: () => void;
}

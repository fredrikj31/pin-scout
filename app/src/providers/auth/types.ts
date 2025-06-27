import type { User } from "firebase/auth";

export interface AuthProviderValue {
  user: User | null | undefined; // User = logged in || null = logged out || undefined = loading
  login: ({ email, password }: { email: string; password: string }) => void;
  signup: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
}

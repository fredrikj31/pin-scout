import type { User } from "firebase/auth";

export interface AuthProviderValue {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => void;
  signup: ({ email, password }: { email: string; password: string }) => void;
}

import type { Analytics } from "firebase/analytics";
import type { Auth } from "firebase/auth";

export interface FirebaseProviderValue {
  analytics: Analytics;
  auth: Auth;
}

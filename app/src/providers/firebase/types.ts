import type { Analytics } from "firebase/analytics";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

export interface FirebaseProviderValue {
  analytics: Analytics;
  auth: Auth;
  firestore: Firestore;
}

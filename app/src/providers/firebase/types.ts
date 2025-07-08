import type { Analytics } from "firebase/analytics";
import type { AppCheck } from "firebase/app-check";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

export interface FirebaseProviderValue {
  appCheck: AppCheck;
  analytics: Analytics;
  auth: Auth;
  firestore: Firestore;
}

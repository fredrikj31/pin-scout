import { initializeApp } from "firebase/app";
import { firebaseConfig } from "~/configs/firebase";
import { FirebaseContext } from "./context";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { config } from "~/config";
import { getFirestore } from "firebase/firestore";

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const app = initializeApp(firebaseConfig);

  if (config.firebase.debugToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = config.firebase.debugToken;
  }
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(config.recaptcha.siteKey),
    isTokenAutoRefreshEnabled: true,
  });

  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return (
    <FirebaseContext.Provider
      value={{
        appCheck,
        analytics,
        auth,
        firestore,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

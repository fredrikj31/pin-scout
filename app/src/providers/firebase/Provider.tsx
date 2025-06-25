import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../configs/firebase";
import { FirebaseContext } from "./context";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { config } from "../../config";

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
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(config.recaptcha.siteKey),
  });

  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  return (
    <FirebaseContext.Provider
      value={{
        analytics,
        auth,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

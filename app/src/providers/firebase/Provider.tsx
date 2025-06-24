import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../configs/firebase";
import { FirebaseContext } from "./context";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { config } from "../../config";

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const app = initializeApp(firebaseConfig);

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(config.recaptcha.siteKey),
  });

  const analytics = getAnalytics(app);

  return (
    <FirebaseContext.Provider
      value={{
        analytics,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

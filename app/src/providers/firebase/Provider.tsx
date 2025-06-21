import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../configs/firebase";
import { FirebaseContext } from "./context";
import { getAnalytics } from "firebase/analytics";

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const app = initializeApp(firebaseConfig);

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

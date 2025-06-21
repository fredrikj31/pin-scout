import { logEvent } from "firebase/analytics";
import { useFirebase } from "../providers/firebase/useFirebase";

export const EventButton = () => {
  const { analytics } = useFirebase();

  const onClick = () => {
    logEvent(analytics, "test-button-clicked");
  };

  return <button onClick={() => onClick()}>Click Me</button>;
};

import { logEvent } from "firebase/analytics";
import { useFirebase } from "../providers/firebase/useFirebase";
import { Button } from "@shadcn-ui/components/ui/button";

export const EventButton = () => {
  const { analytics } = useFirebase();

  const onClick = () => {
    logEvent(analytics, "test-button-clicked");
  };

  return (
    <Button
      className="hover:cursor-pointer"
      variant="outline"
      onClick={() => onClick()}
    >
      Click Me
    </Button>
  );
};

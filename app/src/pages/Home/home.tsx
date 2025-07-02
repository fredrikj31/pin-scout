import { Button } from "@shadcn-ui/components/ui/button";
import { EventButton } from "../../components/EventButton";
import { useAuth } from "../../providers/auth/useAuth";

export const HomePage = () => {
  const auth = useAuth();

  return (
    <div className="p-2">
      <h1 className="text-xl">Hello {auth.user?.email}</h1>
      <EventButton />
      <Button onClick={() => auth.logout()}>Logout</Button>
    </div>
  );
};

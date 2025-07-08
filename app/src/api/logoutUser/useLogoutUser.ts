import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { logoutUser } from "./logoutUser";

export const useLogoutUser = () => {
  const { auth } = useFirebase();
  return useMutation({
    mutationFn: () =>
      logoutUser({
        auth,
      }),
  });
};

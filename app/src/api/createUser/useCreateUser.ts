import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "../../providers/firebase/useFirebase";
import { createUser } from "./createUser";

export const useCreateUser = () => {
  const { auth } = useFirebase();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      createUser({
        auth,
        email,
        password,
      }),
  });
};

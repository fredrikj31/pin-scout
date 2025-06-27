import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "../../providers/firebase/useFirebase";
import { signupUser } from "./signupUser";

export const useSignupUser = () => {
  const { auth } = useFirebase();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signupUser({
        auth,
        email,
        password,
      }),
  });
};

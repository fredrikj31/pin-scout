import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "../../providers/firebase/useFirebase";
import { loginUser } from "./loginUser";

export const useLoginUser = () => {
  const { auth } = useFirebase();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser({
        auth,
        email,
        password,
      }),
  });
};

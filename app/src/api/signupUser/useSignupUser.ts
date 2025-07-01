import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "../../providers/firebase/useFirebase";
import { signupUser } from "./signupUser";

export const useSignupUser = () => {
  const { auth, firestore } = useFirebase();
  return useMutation({
    mutationFn: ({
      email,
      password,
      firstName,
      lastName,
    }: Omit<Parameters<typeof signupUser>[0], "auth" | "firestore">) =>
      signupUser({
        auth,
        firestore,
        email,
        password,
        firstName,
        lastName,
      }),
  });
};

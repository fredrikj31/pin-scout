import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { createMap } from "./createMap";
import { useAuth } from "~/providers/auth/useAuth";

export const useCreateMap = () => {
  const { firestore } = useFirebase();
  const auth = useAuth();
  return useMutation({
    mutationFn: ({ mapProperties }: Pick<Parameters<typeof createMap>[0], "mapProperties">) =>
      createMap({
        firestore,
        userId: auth.user?.uid ?? "",
        mapProperties,
      }),
  });
};

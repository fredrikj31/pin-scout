import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { useAuth } from "~/providers/auth/useAuth";
import { createMapPin } from "./createMapPin";

interface UseCreateMapPinOptions {
  mapId: string;
}
export const useCreateMapPin = ({ mapId }: UseCreateMapPinOptions) => {
  const { firestore } = useFirebase();
  const auth = useAuth();
  return useMutation({
    mutationFn: ({ mapPinProperties }: Pick<Parameters<typeof createMapPin>[0], "mapPinProperties">) =>
      createMapPin({
        firestore,
        userId: auth.user?.uid ?? "",
        mapId,
        mapPinProperties,
      }),
  });
};

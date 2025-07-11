import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { updateMap } from "./updateMap";
import { useAuth } from "~/providers/auth/useAuth";

interface UseUpdateMapOptions {
  mapId: string | undefined;
}
export const useUpdateMap = ({ mapId }: UseUpdateMapOptions) => {
  const { firestore } = useFirebase();
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mapProperties }: Pick<Parameters<typeof updateMap>[0], "mapProperties">) =>
      updateMap({
        firestore,
        userId: auth.user?.uid ?? "",
        mapId,
        mapProperties,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user maps", mapId] });
    },
  });
};

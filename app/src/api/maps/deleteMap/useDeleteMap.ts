import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { deleteMap } from "./deleteMap";
import { useAuth } from "~/providers/auth/useAuth";

export const useDeleteMap = () => {
  const { firestore } = useFirebase();
  const auth = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ mapId }: Pick<Parameters<typeof deleteMap>[0], "mapId">) =>
      deleteMap({
        firestore,
        userId: auth.user?.uid ?? "",
        mapId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user maps"] });
    },
  });
};

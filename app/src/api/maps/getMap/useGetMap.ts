import { useQuery } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { useAuth } from "~/providers/auth/useAuth";
import { getMap } from "./getMap";

interface UseGetMapOptions {
  mapId: string | undefined;
}
export const useGetMap = ({ mapId }: UseGetMapOptions) => {
  const { firestore } = useFirebase();
  const { user: authUser } = useAuth();
  return useQuery({
    queryKey: ["user maps", mapId],
    queryFn: () =>
      mapId
        ? getMap({
            firestore,
            userId: authUser?.uid ?? "",
            mapId,
          })
        : null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

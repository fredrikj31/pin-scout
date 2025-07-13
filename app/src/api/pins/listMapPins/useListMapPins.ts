import { useQuery } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { useAuth } from "~/providers/auth/useAuth";
import { listMapPins } from "./listMapPins";

interface UseListMapPinsOptions {
  mapId: string | undefined;
  mapBounds: {
    latitude: {
      upperBound: number;
      lowerBound: number;
    };
    longitude: {
      upperBound: number;
      lowerBound: number;
    };
  } | null;
}
export const useListMapPins = ({ mapId, mapBounds }: UseListMapPinsOptions) => {
  const { firestore } = useFirebase();
  const { user: authUser } = useAuth();
  return useQuery({
    queryKey: ["user maps pins"],
    queryFn: () =>
      mapId && mapBounds
        ? listMapPins({
            firestore,
            userId: authUser?.uid ?? "",
            mapId,
            latitude: mapBounds.latitude,
            longitude: mapBounds.longitude,
          })
        : [],
  });
};

import { useQuery } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { useAuth } from "~/providers/auth/useAuth";
import { listMaps } from "./listMaps";

export const useListMaps = () => {
  const { firestore } = useFirebase();
  const { user: authUser } = useAuth();
  return useQuery({
    queryKey: ["user maps"],
    queryFn: () =>
      listMaps({
        firestore,
        userId: authUser?.uid ?? "",
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

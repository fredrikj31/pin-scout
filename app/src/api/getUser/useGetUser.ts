import { useQuery } from "@tanstack/react-query";
import { useFirebase } from "~/providers/firebase/useFirebase";
import { getUser } from "./getUser";
import { useAuth } from "~/providers/auth/useAuth";

export const useGetUser = () => {
  const { firestore } = useFirebase();
  const { user: authUser } = useAuth();
  return useQuery({
    queryKey: ["user profile", authUser?.uid],
    queryFn: () =>
      getUser({
        firestore,
        userId: authUser?.uid ?? "",
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

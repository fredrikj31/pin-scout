import { doc, updateDoc, type Firestore } from "firebase/firestore";

interface UpdateMapOptions {
  firestore: Firestore;
  userId: string;
  mapId: string | undefined;
  mapProperties: {
    name: string;
    description: string;
  };
}
export const updateMap = async ({ firestore, userId, mapId, mapProperties }: UpdateMapOptions): Promise<void> => {
  if (!mapId) return;

  await updateDoc(doc(firestore, "users", userId, "maps", mapId), {
    ...mapProperties,
  }).catch((error: unknown) => {
    console.log("Failed to update map document in Firestore", error);
    throw error;
  });
};

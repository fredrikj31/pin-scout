import { collection, deleteDoc, doc, getDocs, writeBatch, type Firestore } from "firebase/firestore";

interface DeleteMapOptions {
  firestore: Firestore;
  userId: string;
  mapId: string;
}
export const deleteMap = async ({ firestore, userId, mapId }: DeleteMapOptions) => {
  // Delete map document
  await deleteDoc(doc(firestore, "users", userId, "maps", mapId)).catch((error: unknown) => {
    console.log("Failed to delete map document in Firestore", error);
    throw error;
  });

  // Get all map pins for the given map
  const pins = await getDocs(collection(firestore, "users", userId, "maps", mapId, "pins"));

  // Delete every map pin for the given map
  const batch = writeBatch(firestore);
  pins.docs.forEach(async (doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit().catch((error: unknown) => {
    console.log("Failed to delete map pin documents in Firestore", error);
    throw error;
  });
};

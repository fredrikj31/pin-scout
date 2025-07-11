import { doc, setDoc, type Firestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface CreateMapOptions {
  firestore: Firestore;
  userId: string;
  mapProperties: {
    name: string;
    description: string;
  };
}
export const createMap = async ({ firestore, userId, mapProperties }: CreateMapOptions) => {
  const mapId = uuidv4();
  await setDoc(doc(firestore, "users", userId, "maps", mapId), {
    id: mapId,
    ...mapProperties,
  }).catch((error: unknown) => {
    console.log("Failed to create map document in Firestore", error);
    throw error;
  });
};

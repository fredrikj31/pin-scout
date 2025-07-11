import { doc, setDoc, type Firestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface CreateMapPinOptions {
  firestore: Firestore;
  userId: string;
  mapId: string;
  mapPinProperties: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  };
}
export const createMapPin = async ({ firestore, userId, mapId, mapPinProperties }: CreateMapPinOptions) => {
  const mapPinId = uuidv4();
  await setDoc(doc(firestore, "users", userId, "maps", mapId, "pins", mapPinId), {
    id: mapPinId,
    ...mapPinProperties,
  }).catch((error: unknown) => {
    console.log("Failed to create map pin document in Firestore", error);
    throw error;
  });
};

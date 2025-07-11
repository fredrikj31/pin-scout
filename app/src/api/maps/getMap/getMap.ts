import { doc, getDoc, type Firestore } from "firebase/firestore";
import { MapSchema, type Map } from "../schemas";

interface GetMapOptions {
  firestore: Firestore;
  userId: string;
  mapId: string;
}
export const getMap = async ({ firestore, userId, mapId }: GetMapOptions): Promise<Map | null> => {
  const document = await getDoc(doc(firestore, "users", userId, "maps", mapId)).catch((error: unknown) => {
    console.log("Failed to get map document in Firestore", error);
    return null;
  });

  if (!document) return null;

  const parsedDocuments = document.data();
  if (!parsedDocuments) return null;

  const { data, success, error } = MapSchema.safeParse(parsedDocuments);

  if (success) {
    return data;
  } else {
    console.error("failed to parse documents", error);
    return null;
  }
};

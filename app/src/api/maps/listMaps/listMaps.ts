import { collection, getDocs, type Firestore } from "firebase/firestore";
import { MapSchema, type Map } from "../schemas";

interface ListMapsOptions {
  firestore: Firestore;
  userId: string;
}
export const listMaps = async ({ firestore, userId }: ListMapsOptions): Promise<Map[]> => {
  // TODO: optimize query with limits and pagination
  const { docs: documents } = await getDocs(collection(firestore, "users", userId, "maps")).catch((error: unknown) => {
    console.log("Failed to list map documents in Firestore", error);
    throw error;
  });

  const parsedDocuments = documents.map((document) => document.data());
  const { data, success, error } = MapSchema.array().safeParse(parsedDocuments);

  if (success) {
    return data;
  } else {
    console.error("failed to parse documents", error);
    return [];
  }
};

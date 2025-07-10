import { addDoc, collection, type Firestore } from "firebase/firestore";

interface CreateMapOptions {
  firestore: Firestore;
  userId: string;
  mapProperties: {
    name: string;
    description: string;
  };
}
export const createMap = async ({
  firestore,
  userId,
  mapProperties,
}: CreateMapOptions) => {
  await addDoc(
    collection(firestore, "users", userId, "maps"),
    mapProperties
  ).catch((error: unknown) => {
    console.log("Failed to create map document in Firestore", error);
    throw error;
  });
};

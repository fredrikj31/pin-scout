import { doc, getDoc, type Firestore } from "firebase/firestore";
import { z } from "zod";

interface GetUserOptions {
  firestore: Firestore;
  userId: string;
}
export const getUser = async ({ firestore, userId }: GetUserOptions): Promise<{ firstName: string }> => {
  // Get Firestore user document
  const document = await getDoc(doc(firestore, "users", userId)).catch((error: unknown) => {
    console.log("Failed to create user profile document in Firestore", error);
    throw error;
  });

  const user = z.object({ firstName: z.string() }).parse(document.data());

  return user;
};

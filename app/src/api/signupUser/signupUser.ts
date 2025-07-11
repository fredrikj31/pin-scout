import { createUserWithEmailAndPassword, type Auth, type User } from "firebase/auth";
import { doc, setDoc, type Firestore } from "firebase/firestore";

interface SignupUserOptions {
  auth: Auth;
  firestore: Firestore;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export const signupUser = async ({
  auth,
  firestore,
  email,
  password,
  firstName,
  lastName,
}: SignupUserOptions): Promise<User> => {
  // Create auth user
  const authUser = await createUserWithEmailAndPassword(auth, email, password).catch((error: unknown) => {
    console.log("Failed to signup user with email and password", error);
    throw error;
  });

  // Create firestore user document
  await setDoc(doc(firestore, "users", authUser.user.uid), {
    email,
    firstName,
    lastName,
  }).catch((error: unknown) => {
    console.log("Failed to create user profile document in Firestore", error);
    throw error;
  });

  return authUser.user;
};

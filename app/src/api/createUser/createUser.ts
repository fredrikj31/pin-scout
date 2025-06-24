import { createUserWithEmailAndPassword, type Auth } from "firebase/auth";

interface CreateUserOptions {
  auth: Auth;
  email: string;
  password: string;
}
export const createUser = async ({
  auth,
  email,
  password,
}: CreateUserOptions): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    console.log("Failed to create user with email and password", error);
    throw error;
  }
};

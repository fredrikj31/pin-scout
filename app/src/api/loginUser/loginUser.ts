import { signInWithEmailAndPassword, type Auth } from "firebase/auth";

interface LoginUser {
  auth: Auth;
  email: string;
  password: string;
}
export const loginUser = async ({
  auth,
  email,
  password,
}: LoginUser): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    console.log("Failed to login user with email and password", error);
    throw error;
  }
};

import { signInWithEmailAndPassword, type Auth, type User } from "firebase/auth";

interface LoginUser {
  auth: Auth;
  email: string;
  password: string;
}
export const loginUser = async ({ auth, email, password }: LoginUser): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: unknown) {
    console.log("Failed to login user with email and password", error);
    throw error;
  }
};

import {
  createUserWithEmailAndPassword,
  type Auth,
  type User,
} from "firebase/auth";

interface SignupUserOptions {
  auth: Auth;
  email: string;
  password: string;
}
export const signupUser = async ({
  auth,
  email,
  password,
}: SignupUserOptions): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: unknown) {
    console.log("Failed to signup user with email and password", error);
    throw error;
  }
};

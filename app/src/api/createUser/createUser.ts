import {
  createUserWithEmailAndPassword,
  type Auth,
  type User,
} from "firebase/auth";

interface CreateUserOptions {
  auth: Auth;
  email: string;
  password: string;
}
export const createUser = async ({
  auth,
  email,
  password,
}: CreateUserOptions): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: unknown) {
    console.log("Failed to create user with email and password", error);
    throw error;
  }
};

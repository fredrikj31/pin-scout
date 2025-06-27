import { signOut, type Auth } from "firebase/auth";

interface LogoutUser {
  auth: Auth;
}
export const logoutUser = async ({ auth }: LogoutUser): Promise<void> => {
  try {
    return await signOut(auth);
  } catch (error: unknown) {
    console.log("Failed to logout user", error);
    throw error;
  }
};

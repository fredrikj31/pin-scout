import { type User } from "firebase/auth";
import { AuthContext } from "./context";
import { useEffect, useState } from "react";
import { useLoginUser } from "../../api/loginUser/useLoginUser";
import { useCreateUser } from "../../api/createUser/useCreateUser";
import { useFirebase } from "../firebase/useFirebase";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useFirebase();

  const { mutate: loginUser } = useLoginUser();
  const { mutate: createUser } = useCreateUser();

  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth]);

  const login = (data: { email: string; password: string }) => {
    loginUser(data, {
      onError: (error) => {
        console.log("Error while signing in!", error);
      },
      onSuccess: (user) => {
        setUser(user);
      },
    }); // TODO: Make callback to revalidate contexts
  };

  const signup = (data: { email: string; password: string }) => {
    createUser(data, {
      onError: (error) => {
        console.log("Error while signing up!", error);
      },
      onSuccess: (user) => {
        setUser(user);
      },
    }); // TODO: Make callback to revalidate contexts
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

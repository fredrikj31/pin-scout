import { useNavigate } from "react-router";
import { AuthContext } from "./context";
import { useState } from "react";
import { type User } from "firebase/auth";
import { useLoginUser } from "../../api/loginUser/useLoginUser";
import { useCreateUser } from "../../api/createUser/useCreateUser";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { mutate: loginUser } = useLoginUser();
  const { mutate: createUser } = useCreateUser();

  const [user, setUser] = useState<User | null | undefined>(undefined); // Set default as loading, to wait until Firebase auth has finished loading

  const login = (data: { email: string; password: string }) => {
    loginUser(data, {
      onError: (error) => {
        console.log("Error while signing in!", error);
      },
      onSuccess: (user) => {
        setUser(user);
        navigate("/");
      },
    });
  };

  const signup = (data: { email: string; password: string }) => {
    createUser(data, {
      onError: (error) => {
        console.log("Error while signing up!", error);
      },
      onSuccess: (user) => {
        setUser(user);
        navigate("/");
      },
    });
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

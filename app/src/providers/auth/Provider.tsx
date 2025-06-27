import { useNavigate } from "react-router";
import { AuthContext } from "./context";
import { useEffect, useState } from "react";
import { type User } from "firebase/auth";
import { useLoginUser } from "../../api/loginUser/useLoginUser";
import { useCreateUser } from "../../api/createUser/useCreateUser";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { mutate: loginUser } = useLoginUser();
  const { mutate: createUser } = useCreateUser();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

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

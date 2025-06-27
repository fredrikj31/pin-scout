import { useNavigate } from "react-router";
import { AuthContext } from "./context";
import { useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useFirebase } from "../firebase/useFirebase";
import { useLoginUser } from "../../api/loginUser/useLoginUser";
import { useSignupUser } from "../../api/signupUser/useSignupUser";
import { useLogoutUser } from "../../api/logoutUser/useLogoutUser";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const {auth} = useFirebase();

  const { mutate: loginUser } = useLoginUser();
  const { mutate: signupUser } = useSignupUser();
  const { mutate: logoutUser } = useLogoutUser();

  const [user, setUser] = useState<User | null | undefined>(undefined); // Set default as loading, to wait until Firebase auth has finished loading

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user); // Logged in
    } else {
      setUser(null); // Logged out
    }
  });

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
    signupUser(data, {
      onError: (error) => {
        console.log("Error while signing up!", error);
      },
      onSuccess: (user) => {
        setUser(user);
        navigate("/");
      },
    });
  };

  const logout = () => {
    logoutUser(undefined, {
      onError: (error) => {
        console.log("Error while logging out!", error);
      },
      onSuccess: () => {
        setUser(null);
        navigate("/login");
      },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

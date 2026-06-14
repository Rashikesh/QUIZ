"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("qwizzy_token");
    const profile = localStorage.getItem("qwizzy_user");

    if (token && profile) {
      setUser(JSON.parse(profile));
    }
    setLoading(false);
  }, []);

  const loginUser = (token, userProfile, rememberMe, email) => {
    localStorage.setItem("qwizzy_token", token);
    localStorage.setItem("qwizzy_user", JSON.stringify(userProfile));

    if (rememberMe) {
      localStorage.setItem("qwizzy_remembered_email", email);
    } else {
      localStorage.removeItem("qwizzy_remembered_email");
    }

    setUser(userProfile);
  };

  const logoutUser = () => {
    localStorage.removeItem("qwizzy_token");
    localStorage.removeItem("qwizzy_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

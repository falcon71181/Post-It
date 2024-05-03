"use client"

import React, { useState, useEffect, useContext, createContext } from "react";
import { AuthContextType, AuthUser } from "@/types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProps) {
  const SERVER = process.env.NEXT_PUBLIC_SERVER as string;
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // INFO: Verify User's jwt token
    const verifyUser = async () => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      if (!username && !token) return;

      const response = await fetch(`${SERVER}/users/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok && username && token) {
        const authUserDetails: AuthUser = { username, token }
        setAuthUser(authUserDetails);
      }
    };
    verifyUser();
  }, [SERVER])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
  )
}

//INFO: custom auth hook
export const useAuthContext = () => {
  const { authUser, setAuthUser } = useContext(AuthContext) as AuthContextType;

  return { authUser, setAuthUser }
}

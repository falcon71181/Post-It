import { Dispatch, SetStateAction } from "react";

type LoginUser = {
  email?: string;
  username?: string;
  password?: string;
}

type RegisterUser = {
  email: string;
  username: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  password: string;
  confirmPassword: string;
}

type AuthUser = {
  username: string;
  email: string;
  token: string;
}

type AuthCheck = {
  user: AuthUser | null;
  error: string | null;
}

type AuthContextType = {
  authUser: AuthUser | null;
  setAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
}

export type { LoginUser, RegisterUser, AuthUser, AuthCheck, AuthContextType };

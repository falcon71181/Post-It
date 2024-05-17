import { Dispatch, SetStateAction } from "react";

type LoginUser = {
    email?: string;
    username?: string;
    password: string;
}

type RegisterUser = {
    email: string;
    username: string;
    firstName: string;
    middleName?: string;
    lastName?: string;
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

type UserDataType = {
    username: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    registered_on: Date;
    admin: boolean;
}

export type { UserDataType, LoginUser, RegisterUser, AuthUser, AuthCheck, AuthContextType };

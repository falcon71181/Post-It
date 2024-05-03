"use client"

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { AuthCheck, AuthUser, LoginUser } from "@/types/auth";

const initialState: AuthCheck = {
  user: null,
  error: null,
}

const Login = () => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const [loginVia, setLoginVia] = useState(false);

  const handleRegisteration = async (_preState: any, formData: FormData) => {
    try {
      const userData: LoginUser = {
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      }
      const response = await fetch(`${SERVER}/users/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        }
      })

      if (response.ok) {
        const responseData = await response.json();
        const user: AuthUser = responseData;

        localStorage.setItem("token", responseData.token);
        localStorage.setItem("token", responseData.username);

        const newState: AuthCheck = {
          user,
          error: null
        };

        return newState;
      }
    } catch (error) {
      if (error instanceof Error) {
        const newState = {
          user: null,
          error: error.message
        }

        return newState;
      }
    }
  }

  const [state, formAction] = useFormState(handleRegisteration, initialState);
  return (
    <div className="px-3 min-h-[80vh] flex justify-center items-center border border-cyan-300">
      <div className="w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-7/12 p-5 flex flex-col gap-2 bg-background border border-border transition-all duration-1000">
        <h1 className="font-semibold text-3xl">Login Into Account</h1>
        <h1 className="text-sm text-neutral-400">Enter your valid details to login into your account.</h1>
        <form action={formAction} className="grid grid-cols-3 gap-y-2 gap-x-3">
          <h1 className="text-base dark:text-neutral-300 col-span-3">{loginVia ? "Username" : "Email"}</h1>
          <input
            type={loginVia ? "text" : "email"}
            id={loginVia ? "username" : "email"}
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={loginVia ? "dreadredpirate123" : "dreadredpirate123@silkroad.onion"}
          />
          <div className="text-blue-300 col-span-3 text-xs font-semibold text-right mr-3 hover:underline hover:underline-offset-4 cursor-pointer"
            onClick={() => setLoginVia(!loginVia)}
          >{loginVia ? "Login by using username" : "Login by using email"}</div>
          <h1 className="text-base dark:text-neutral-300 col-span-3">Password</h1>
          <input
            type="password"
            id="password"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            required />
        </form>
        <button type="submit" className="w-full px-3 py-2 mt-5 text-lg dark:text-black font-semibold flex items-center justify-center rounded-md border border-border cursor-pointer bg-neutral-300 hover:bg-neutral-300/80 select-none transition-colors duration-200">
          Login Into Account
        </button>
      </div>
    </div>
  )
}

export default Login;

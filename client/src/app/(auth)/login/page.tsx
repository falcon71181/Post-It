"use client"

import React, { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { AuthCheck, AuthUser } from "@/types/auth";
import { loginUser } from "../actions";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";

const initialState: AuthCheck = {
  user: null,
  error: null,
}

const Login = () => {
  const [loginVia, setLoginVia] = useState(false);
  const [state, formAction] = useFormState(loginUser, initialState);
  const { pending } = useFormStatus();
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      const authUserDetails: AuthUser = {
        username: state.user.username,
        email: state.user.email,
        token: state.user.token,
      }
      localStorage.setItem('username', authUserDetails.username);
      localStorage.setItem('token', authUserDetails.token);
      localStorage.setItem('email', authUserDetails.email);
      setAuthUser(authUserDetails);
      router.push("/");
    }
  }, [state.user, router, setAuthUser]);

  return (
    <div className="px-3 min-h-[80vh] flex justify-center items-center">
      <div className="w-full sm:w-9/12 lg:w-6/12 xl:w-5/12 p-5 flex flex-col gap-2 bg-background border border-border transition-all duration-1000">
        <h1 className="font-semibold text-2xl md:text-3xl">Login Into Account</h1>
        <h1 className="text-xs md:text-sm text-neutral-400">Enter your valid details to login into your account.</h1>
        <form action={formAction} className="relative grid grid-cols-3 gap-y-2 gap-x-3">
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">{loginVia ? "Username" : "Email"}</h1>
          <input
            type={loginVia ? "text" : "email"}
            id={loginVia ? "username" : "email"}
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={loginVia ? "dreadredpirate123" : "dreadredpirate123@silkroad.onion"}
            name={loginVia ? "username" : "email"}
            required
          />
          <div
            className="text-blue-300 col-span-3 text-xs font-semibold text-right mr-3 hover:underline hover:underline-offset-4 cursor-pointer"
            onClick={() => setLoginVia(!loginVia)}
          >
            {loginVia ? "Login using email" : "Login using username"}
          </div>
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Password</h1>
          <input
            type="password"
            id="password"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            name="password"
            required />
          <button
            aria-disabled={pending}
            className={`${pending ? 'cursor-wait' : 'cursor-pointer'} col-span-3 px-3 py-2 mt-5 text-base md:text-lg dark:text-black font-semibold flex items-center justify-center rounded-md border border-border cursor-pointer bg-neutral-300 hover:bg-neutral-300/80 select-none transition-all duration-200`}
          >
            {pending ? 'Loading...' : 'Login Into Account'}
          </button>
          {state.error && <div className="absolute w-full text-center left-1/2 top-[112%] -translate-x-1/2 text-red-500 font-sm">{state.error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login;

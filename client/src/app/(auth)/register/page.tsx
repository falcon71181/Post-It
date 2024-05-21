"use client"

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import type { AuthCheck, AuthUser } from "@/types/auth";
import { registerUser } from "../actions";
import { useAuthContext } from "@/contexts/auth";

const initialState: AuthCheck = {
  user: null,
  error: null,
}

const Register = () => {
  const [state, formAction] = useFormState(registerUser, initialState);
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
      <div className="w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-7/12 p-5 flex flex-col gap-2 bg-background border border-border transition-all duration-1000">
        <h1 className="font-semibold text-2xl md:text-3xl transition-all duration-500">Create New Account</h1>
        <h1 className="text-xs md:text-sm text-neutral-400">Enter your valid details to create a new account.</h1>
        <form action={formAction} className="relative grid grid-cols-3 gap-y-2 gap-x-3">
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Username</h1>
          <input
            type="text"
            id="username"
            name="username"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dreadredpirate123"
            required />
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">First Name</h1>
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">Middle Name</h1>
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">Last Name</h1>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Dread"
            required
          />
          <input
            type="text"
            id="middleName"
            name="middleName"
            className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Pirate"
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Robert"
          />
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Email</h1>
          <input
            type="text"
            id="email"
            name="email"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dreadredpirate123@silkroad.onion"
            required
          />
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Password</h1>
          <input
            type="password"
            id="password"
            name="password"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            required
          />
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Confirm Password</h1>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="confirm_password"
            required
          />
          <button
            type="submit"
            aria-disabled={pending}
            className={`${pending ? 'cursor-wait' : 'cursor-pointer'} col-span-3 w-full px-3 py-2 mt-5 text-base md:text-lg dark:text-black font-semibold flex items-center justify-center rounded-md border border-border cursor-pointer bg-neutral-300 hover:bg-neutral-300/80 select-none transition-all duration-200`}
          >
            {pending ? 'Loading...' : 'Create Account'}
          </button>
          {state.error && <div className="absolute w-full text-center left-1/2 top-[107%] -translate-x-1/2 text-red-500 font-sm">{state.error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Register;

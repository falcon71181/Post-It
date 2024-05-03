"use client"

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useAuthContext } from "@/contexts/auth";
import type { RegisterUser, AuthCheck, AuthUser } from "@/types/auth";

const initialState: AuthCheck = {
  user: null,
  error: null,
}

const Register = () => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const { authUser, setAuthUser } = useAuthContext();

  const handleRegisteration = async (_preState: any, formData: FormData) => {
    try {
      const userData: RegisterUser = {
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        first_name: formData.get("first_name") as string,
        middle_name: formData.get("middle_name") as string,
        last_name: formData.get("last_name") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      }
      const response = await fetch(`${SERVER}/users/register`, {
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

        // INFO: updating auth context
        setAuthUser(user);

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
        <h1 className="font-semibold text-2xl md:text-3xl transition-all duration-500">Create New Account</h1>
        <h1 className="text-xs md:text-sm text-neutral-400">Enter your valid details to create a new account.</h1>
        <form action={formAction} className="grid grid-cols-3 gap-y-2 gap-x-3">
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Username</h1>
          <input
            type="text"
            id="username"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dreadredpirate123"
            required />
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">First Name</h1>
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">Middle Name</h1>
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">Last Name</h1>
          <input
            type="text"
            id="first_name"
            className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Dread"
            required />
          <input
            type="text"
            id="middle_name"
            className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Pirate"
          />
          <input
            type="text"
            id="last_name"
            className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Robert"
          />
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Email</h1>
          <input
            type="text"
            id="email"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dreadredpirate123@silkroad.onion"
            required />
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Password</h1>
          <input
            type="password"
            id="password"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            required />
          <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Confirm Password</h1>
          <input
            type="password"
            id="confirm_password"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="confirm_password"
            required />
        </form>
        <button type="submit" className="w-full px-3 py-2 mt-5 text-base md:text-lg dark:text-black font-semibold flex items-center justify-center rounded-md border border-border cursor-pointer bg-neutral-300 hover:bg-neutral-300/80 select-none transition-all duration-200">
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Register;

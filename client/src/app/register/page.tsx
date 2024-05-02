import React from "react";

const Register = () => {
  return (
    <div className="px-3 min-h-[80vh] flex justify-center items-center border border-cyan-300">
      <div className="w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-7/12 p-5 flex flex-col gap-2 bg-background border border-border transition-all duration-1000">
        <h1 className="font-semibold text-3xl">Create Account</h1>
        <h1 className="text-sm text-neutral-400">Enter your valid details to create a new account.</h1>
        <section className="grid grid-cols-3 gap-y-2 gap-x-3">
          <h1 className="text-base dark:text-neutral-300 col-span-3">Username</h1>
          <input
            type="text"
            id="username"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dreadredpirate123"
            required />
          <h1 className="text-base dark:text-neutral-300 col-span-1">First Name</h1>
          <h1 className="text-base dark:text-neutral-300 col-span-1">Middle Name</h1>
          <h1 className="text-base dark:text-neutral-300 col-span-1">Last Name</h1>
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
          <h1 className="text-base dark:text-neutral-300 col-span-3">Email</h1>
          <input
            type="text"
            id="email"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="dreadredpirate123@silkroad.onion"
            required />
          <h1 className="text-base dark:text-neutral-300 col-span-3">Password</h1>
          <input
            type="text"
            id="password"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            required />
          <h1 className="text-base dark:text-neutral-300 col-span-3">Confirm Password</h1>
          <input
            type="text"
            id="confirm_password"
            className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="confirm_password"
            required />
        </section>
        <div className="w-full px-3 py-2 mt-5 text-lg dark:text-black font-semibold flex items-center justify-center rounded-md border border-border cursor-pointer bg-neutral-300 hover:bg-neutral-300/80 select-none transition-colors duration-200">
          Create Account
        </div>
      </div>
    </div>
  )
}

export default Register;

'use client'
import { useState, useEffect } from "react";
import type { UserDataType } from "@/types/auth";
import { getPersonalDetails } from "@/lib/getUserData";

type ResponseErrorType = {
  error: string;
}
const Profile = () => {
  const [responseError, setResponseError] = useState<ResponseErrorType | null>(null);
  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const [userData, setUserData] = useState<UserDataType | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getPersonalDetails();
        if (data) {
          setUserData(data);
        }
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <div className="p-5 flex flex-col items-center gap-3 md:gap-5 border border-red-300">
      <div className="relative w-full flex items-center justify-center h-1/6 md:h-[15vh] border border-cyan-300">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-caveat tracking-widest">Hi, falcon</h1>
      </div>
      <div className="w-full flex flex-row-reverse">
        <h1 className="border border-red-300 grow">Change Avator</h1>
        <ProfileUpdateForm userData={userData} responseError={responseError} />
      </div>
    </div>
  )
}

const ProfileUpdateForm = ({ userData, responseError }: { userData: UserDataType | null, responseError: ResponseErrorType | null }) => {
  const [toggleChangePassword, setToggleChangePassword] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-2 w-full sm:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-7/12 p-5 bg-background border border-border transition-all duration-500">
      <h1 className="font-semibold text-2xl md:text-3xl transition-all duration-500">Edit Profile</h1>
      <h1 className="text-xs md:text-sm text-neutral-400">Edit details to update your profile.</h1>
      <form action={() => alert("working")} className="grid grid-cols-3 gap-y-2 gap-x-3">
        <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Username</h1>
        <input
          type="text"
          id="username"
          className="cursor-not-allowed col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white"
          placeholder="dreadredpirate123"
          defaultValue={userData?.username}
          readOnly
        />
        <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">First Name</h1>
        <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">Middle Name</h1>
        <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-1">Last Name</h1>
        <input
          type="text"
          id="first_name"
          className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Dread"
          defaultValue={userData?.first_name}
        />
        <input
          type="text"
          id="middle_name"
          className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pirate"
          defaultValue={userData?.middle_name}
        />
        <input
          type="text"
          id="last_name"
          className="col-span-1 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Robert"
          defaultValue={userData?.last_name}
        />
        <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Email</h1>
        <input
          type="text"
          id="email"
          className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="dreadredpirate123@silkroad.onion"
          defaultValue={userData?.email}
        />
        <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Current Password</h1>
        <input
          type="password"
          id="current_password"
          className="col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="password"
          required />
        <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Joined On</h1>
        <input
          type="password"
          id="current_password"
          className="cursostatus in the range 200-299) orr-not-allowed col-span-3 bg-background border border-border text-gray-900 text-sm rounded-sm block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white"
          placeholder={userData?.registered_on.toLocaleString() || ""}
          readOnly
        />
        <h1 className="pl-2 tracking-wide text-xs md:text-sm dark:text-cyan-500 dark:hover:text-cyan-500/80 font-semibold col-span-3 cursor-pointer"
          onClick={() => setToggleChangePassword(!toggleChangePassword)}
        >Change Password</h1>
        {/* TODO: Add Animations in toggle */}
        {toggleChangePassword && (
          <div className="col-span-3">
            <h1 className="text-sm md:text-base dark:text-neutral-300">New Password</h1>
            <input
              type="password"
              id="new_password"
              className="bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password"
            />
            <h1 className="text-sm md:text-base dark:text-neutral-300">Confirm New Password</h1>
            <input
              type="password"
              id="confirm_password"
              className="bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="confirm_password"
            />
          </div>
        )}
        {responseError && (
          <h1 className="text-red-300 text-xs">{responseError.error}</h1>
        )}
        <button type="submit" className="col-span-3 px-3 py-2 mt-5 text-base md:text-lg dark:text-black font-semibold flex items-center justify-center rounded-md border border-border cursor-pointer bg-neutral-300 hover:bg-neutral-300/80 select-none transition-all duration-200">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Profile;

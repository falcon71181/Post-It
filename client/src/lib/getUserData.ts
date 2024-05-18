import type { UserDataType } from "@/types/auth";

const SERVER = process.env.NEXT_PUBLIC_SERVER;

const getPersonalDetails = async (): Promise<UserDataType | null> => {
  const token = localStorage.getItem('token') as string;
  if (!token) {
    return null;
  }
  const response = await fetch(`${SERVER}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data as UserDataType;
  } else {
    return null;
  }
}

export { getPersonalDetails };

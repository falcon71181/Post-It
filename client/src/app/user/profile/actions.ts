import { UpdateUserProfile } from "@/types/auth";

export type UpdatedProfile = {
  profile: any;
  error: string | null;
}

const SERVER = process.env.NEXT_PUBLIC_SERVER as string;

const updateProfile = async (_prevState: any, formData: FormData) => {
  const formBody: UpdateUserProfile = {
    currPassword: formData.get("currPassword") as string,
    newPassword: formData?.get("newPassword") as string,
    confirmNewPassword: formData?.get("confirmNewPassword") as string,
    firstName: formData?.get("firstName") as string,
    middleName: formData?.get("middleName") as string,
    lastName: formData?.get("lastName") as string,
    updated_email: formData?.get("updated_email") as string,
  }

  // TODO: Add validation

  let newState: UpdatedProfile = {
    profile: null,
    error: null,
  }

  try {
    const res = await fetch(`${SERVER}/users/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formBody),
      cache: 'no-cache'
    })

    const data = await res.json();

    if (res.ok) {
      newState.profile = data;
    }

    if (!res.ok) {
      throw new Error(data.error);
    }
  } catch (error) {
    if (error instanceof Error) {
      newState.error = error.message;
    }
  }

  return newState;
}

export { updateProfile };

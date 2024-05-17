'use server'

import { AuthCheck, LoginUser } from "@/types/auth";

const loginUser = async (_prefState: any, formData: FormData) => {
    const formBody: LoginUser = {
        username: formData.get('username') as string | undefined,
        email: formData.get('email') as string | undefined,
        password: formData.get('password') as string
    }


    let newState: AuthCheck = {
        user: null,
        error: null
    }

    try {
        const res = await fetch('http://localhost:3333/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formBody)
        })

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            newState.user = {
                username: data.username,
                token: data.token
            }
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

export { loginUser };

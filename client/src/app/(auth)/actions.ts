'use server'

import {
    AuthCheck,
    LoginUser,
    RegisterUser
} from "@/types/auth";

const registerUser = async (_prevState: any, formData: FormData) => {
    const formBody: RegisterUser = {
        email: formData.get('email') as string,
        username: formData.get('username') as string,
        firstName: formData.get('firstName') as string,
        middleName: formData.get('middleName') as string || undefined,
        lastName: formData.get('lastName') as string || undefined,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    }

    // TODO: Add validation

    let newState: AuthCheck = {
        user: null,
        error: null
    }

    try {
        const res = await fetch('http://localhost:3333/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formBody),
            cache: 'no-cache'
        })

        const data = await res.json();

        if (res.ok) {
            newState.user = {
                username: data.username,
                email: data.email,
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

const loginUser = async (_prevState: any, formData: FormData) => {
    const formBody: LoginUser = {
        username: formData.get('username') as string | undefined,
        email: formData.get('email') as string | undefined,
        password: formData.get('password') as string
    }

    // TODO: Add validation

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
            body: JSON.stringify(formBody),
            cache: 'no-cache'
        })

        const data = await res.json();

        if (res.ok) {
            newState.user = {
                username: data.username,
                email: data.email,
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

export { loginUser, registerUser };

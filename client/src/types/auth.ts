type LoginUser = {
  email?: string;
  username?: string;
  password?: string;
}

type RegisterUser = {
  email: string;
  username: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  password: string;
  confirmPassword: string;
}

type AuthUser = {
  username: string;
  token: string;
}

type AuthCheck = {
  user: AuthUser | null;
  error: string | null;
}

export type { LoginUser, RegisterUser, AuthUser, AuthCheck };

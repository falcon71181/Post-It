export type RegisterUserConfig = {
  username: string;
  first_name: string;
  middle_name: string | null;
  last_name: string | null;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginUserConfig = {
  username?: string;
  email?: string;
  password: string;
}

export type LoginResponseType = {
  message: string;
  username: string;
  email: string;
  token: string;
}

export type RegisterResponseType = LoginResponseType;

export type ErrorResponseType = {
  error: string;
}

type RegisterUserConfig = {
  username: string;
  first_name: string;
  middle_name: string | null;
  last_name: string | null;
  email: string;
  password: string;
  confirmPassword: string;
}

type LoginUserConfig = {
  username?: string;
  email?: string;
  password: string;
}

type LoginResponseType = {
  message: string;
  username: string;
  email: string;
  token: string;
}

type RegisterResponseType = LoginResponseType;

type ErrorResponseType = {
  error: string;
}

export type { RegisterUserConfig, LoginUserConfig, RegisterResponseType, LoginResponseType, ErrorResponseType };

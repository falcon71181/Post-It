export type RegisterUserConfig = {
  username: string;
  first_name: string;
  middle_name: string | null;
  last_name: string | null;
  email: string;
  password: string;
  confirmPassword: string;
}

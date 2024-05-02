import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

type JwtPayload = {
  email: string;
  username: string;
}

export const createToken = (email: string, username: string): string => {
  try {
    // Define the type for the secret
    const JWT_SECRET: string = process.env.JWT_SECRET || "secret";
    const payload: JwtPayload = { email: email, username: username };
    const signOptions: SignOptions = { expiresIn: "12h" };
    const token: string = jwt.sign(payload, JWT_SECRET, signOptions);

    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
}

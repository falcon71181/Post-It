import { pool } from "../database/db";
import { compare, hash } from "bcrypt";
import { createToken } from "../lib/token";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { LoginUserConfig, RegisterUserConfig } from "../types/auth";
import type { QueryResult } from "pg";


// register an user
// TODO: add strong password checker
const registerUser = async (req: FastifyRequest<{ Body: RegisterUserConfig }>, res: FastifyReply) => {
  try {

    let { username, first_name, middle_name, last_name, email, password, confirmPassword }: RegisterUserConfig = req.body;

    // check if any field is missing
    if (!username || !first_name || !email || !password || !confirmPassword) {
      return res.status(400).send({ error: "Require all fields (username, first_name, email, password, confirmPassword)." })
    }

    // trim all fields
    username = username.trim() as string;
    first_name = first_name.trim() as string;
    middle_name = middle_name?.trim() as string || null;
    last_name = last_name?.trim() as string || null;
    email = email.trim() as string;
    email = String(email).toLowerCase();
    password = password.trim() as string;
    confirmPassword = confirmPassword.trim() as string;

    // Validate password 
    if (!validatePassword(password as string) || (password.length < 8 || password.length > 50)) {
      return res.status(403).send({ error: "Password should contains atleast one (special character, uppercase character, lowercase character, number) & character limit is: [8, 50] " })
    }

    // Validate email format
    if (!validateEmail(email as string)) {
      return res.status(403).send({ error: "Invalid email format." });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Passwords do not match." });
    }

    // Check if user already exists
    const existingUser_with_email: QueryResult = await pool.query("SELECT * FROM users WHERE email = $1", [email as string]);
    const existingUser_with_username: QueryResult = await pool.query("SELECT * FROM users WHERE username = $1", [username as string]);
    if (existingUser_with_email.rows.length > 0 || existingUser_with_username.rows.length > 0) {
      return res.status(409).send({ error: "User already exists." });
    }

    // hash the password
    const hashedPassword: string = await hash(password, 12) as string;
    await pool.query("INSERT INTO users (username, first_name, middle_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5, $6)", [username as string, first_name as string, middle_name as string, last_name as string, email as string, hashedPassword as string]);

    const token: string = createToken(email, username);
    // Send success response
    res.status(200).send({
      message: "User registered successfully.",
      username: username as string,
      token: token as string
    });

  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
}

const loginUser = async (req: FastifyRequest<{ Body: LoginUserConfig }>, res: FastifyReply) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    const error = 'Enter either your username or email to login';
    return res.status(400).send({ error: error });
  }

  try {
    // Setting DB attribute name and value from available field in req.body
    const userAttr = username ? 'username' : 'email';
    const userAttrValue = username ? username : email as string;

    const result = await pool.query(
      `SELECT username, email, password FROM users WHERE ${userAttr} = $1`,
      [userAttrValue as string]
    );
    const user: { username: string, email: string, password: string } | undefined = result.rows[0];

    if (!user) {
      const error = "User not found.";
      return res.status(404).send({ error: error });
    }

    const correctPassword = await compare(password, user.password);

    if (!correctPassword) {
      const error = "Incorrect Password";
      return res.status(401).send({ error: error });
    }

    // Sucessfull login
    const token = createToken(user.email, user.username);
    const response = {
      message: 'User logged in successfully',
      username: user.username as string,
      email: user.email as string,
      token: token as string,
    }

    res.send({ response });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// Validate password
function validatePassword(pw: string): boolean {
  return /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[\W_]/.test(pw) &&
    pw.length > 4;
}

// Validate email address
const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

export { registerUser, loginUser };

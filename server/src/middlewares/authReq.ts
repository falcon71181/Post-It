import jwt from "jsonwebtoken";
import type { JwtPayload } from "../lib/token";
import { pool } from "../database/db";
import type { QueryResult } from "pg";
import type { FastifyInstance, FastifyRequest, FastifyReply, preHandlerAsyncHookHandler } from "fastify";

// Secret key for JWT signing
const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

// Middleware function to authenticate requests
export const isAuth: preHandlerAsyncHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  try {
    // Extract authorization header
    const { authorization } = req.headers;

    // Check if authorization header exists
    if (!authorization) {
      return res.status(401).send("No JWT Token ");
    }

    // Split authorization header to extract token
    const [bearer, token] = authorization.split(" ");

    // Check if the header is in the expected "Bearer <token>" format
    if (bearer !== "Bearer" || !token) {
      return res.status(401).send("Invalid Authorization header format");
    }

    // Verify JWT token
    const payload: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Extract email from JWT payload
    const { email, username } = payload;

    // Query database to check if user is admin or not
    const admin: QueryResult = await pool.query(
      `SELECT * FROM admins WHERE email = $1`,
      [email as string],
    );

    if (admin.rows.length === 0) {
      req.isAdmin = false;
    } else if (admin.rows.length > 0) {
      req.isAdmin = true;
    }

    // Query database to find user by email
    const user: QueryResult = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email as string],
    );

    // Check if user exists
    if (user.rows.length === 0) {
      return res.status(404).send("User doesn't exist");
    }

    // Attach email to request object for further middleware or route handlers
    req.email = email;
    req.username = username;

  } catch (error) {
    // Handle errors
    res.status(500).send({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const isAuthHook = async (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', isAuth);
};

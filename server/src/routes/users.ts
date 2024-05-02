import { loginUser, registerUser } from "../controller/auth.controller";
import type { FastifyInstance } from "fastify";

const routes = async (app: FastifyInstance) => {
  app.post('/register', registerUser);
  app.post('/login', loginUser);
}

export { routes as user_routes };

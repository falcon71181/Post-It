import { registerUser } from "../controller/auth.controller";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";

const routes = async (app: FastifyInstance, _options: FastifyPluginOptions) => {
  //register new user 
  app.post("/register", registerUser)
}

export { routes as user_routes };

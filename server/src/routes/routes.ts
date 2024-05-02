import { user_routes } from "./users";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";

const routes = async (app: FastifyInstance, options: FastifyPluginOptions) => {

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).send();
  })

  // users routes 
  app.register(user_routes, { prefix: "/users" });
}

export default routes;

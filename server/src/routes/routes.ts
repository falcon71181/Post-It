import { user_routes } from "./users";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const routes = async (app: FastifyInstance) => {
  app.get("/", (_req: FastifyRequest, res: FastifyReply) => {
    res.redirect("/health");
  })

  // Health check
  app.get("/health", (_req: FastifyRequest, res: FastifyReply) => {
    res.status(200).send();
  })

  // Users routes 
  app.register(user_routes, { prefix: "/users" });
}

export default routes;

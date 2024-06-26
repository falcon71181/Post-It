import postRoutes from "./posts";
import { user_routes } from "./users";
import { admin_routes } from "./admins";
import { fastifyExpress } from "@fastify/express";
import xXssProtection from "x-xss-protection";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const routes = async (app: FastifyInstance) => {
  // Express middlewares
  await app.register(fastifyExpress);
  app.use(xXssProtection());

  app.get("/", (_req: FastifyRequest, res: FastifyReply) => {
    res.redirect("/health");
  })

  // Health check
  app.get("/health", (_req: FastifyRequest, res: FastifyReply) => {
    res.status(200).send();
  })

  app.register(admin_routes, { prefix: "/admin" });
  app.register(user_routes, { prefix: "/users" });
  app.register(postRoutes, { prefix: '/posts' });
}

export type Message = {
  "type": "send" | "receive" | "user-log",
  "messageObj": {
    "username": string,
    "socketId": string,
    "createdOn": number,
    "message": string
  }
}

export default routes;

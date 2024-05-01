import type { FastifyInstance, FastifyPluginOptions } from "fastify";

const routes = async (app: FastifyInstance, options: FastifyPluginOptions) => {

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).send();
  })
}

export default routes;

import { loginUser, registerUser } from "../controllers/auth.controller";
import { isAuth } from "../middlewares/authReq";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const routes = async (app: FastifyInstance) => {
  app.post('/register', registerUser);
  app.post('/login', loginUser);

  //INFO: validate user's hwt token
  app.get('/validate', { preHandler: isAuth }, (_req: FastifyRequest, res: FastifyReply) => {
    res.status(200).send();
  });
}

export { routes as user_routes };

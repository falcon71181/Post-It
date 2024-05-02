import fastify from "fastify";
import type { FastifyInstance } from "fastify";
import routes from "./routes/routes";

const PORT: number = Number(process.env.SERVER_PORT) || 3333;
const app: FastifyInstance = fastify({
    logger: true
})

// routes
app.register(routes, { prefix: "/" });

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log(`Server listening at ${address}`)
})

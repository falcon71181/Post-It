import fastify from 'fastify';
import routes from './routes/routes';
import { initializeTables } from './lib/initializeTables';
import fastifySocketIO from './lib/socket';
import cors from '@fastify/cors';
import { Server } from 'socket.io';
import type { FastifyInstance } from 'fastify';

export type Message = {
  type: 'send' | 'receive' | 'user-log',
  messageObj: {
    username: string,
    socketId: string,
    createdOn: number,
    message: string
  }
}

const PORT: number = Number(process.env.SERVER_PORT) || 3333;
const app: FastifyInstance = fastify();

// Register CORS
app.register(cors, {
  origin: (process.env.ALLOWED_ORIGINS)?.split(','),
  methods: (process.env.ALLOWED_METHODS)?.split(','),
});

// Register Socket.IO with Fastify
app.register(fastifySocketIO, {
  cors: {
    origin: (process.env.ALLOWED_ORIGINS)?.split(','),
    methods: (process.env.ALLOWED_METHODS)?.split(','),
  }
});

// Extend Fastify instance to include `io` property
declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

// Socket.IO configuration
app.ready((err) => {
  if (err) throw err;

  app.io.on('connection', (socket) => {
    console.log(`🟢 ${socket.id} CONNECTED!`);

    socket.on('send-message', (messageObj: Message) => {
      // Attach creation time and change type
      messageObj.type = 'receive';
      messageObj.messageObj.createdOn = Date.now();
      app.io.emit('receive-message', messageObj);
    });

    socket.on('disconnect', () => {
      console.log(`🔴 ${socket.id} DISCONNECTED`);
    });
  });
});

// Register routes
app.register(routes, { prefix: '/' });

// Initialize tables and start the server
initializeTables()
  .then(() => {
    app.listen({ port: PORT }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      console.log(`Server listening at ${address}`);
    });
  })
  .catch(error => {
    console.error('Error initializing tables:', error);
    process.exit(1);
  });

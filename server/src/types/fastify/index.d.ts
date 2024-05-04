import fastify from 'fastify';

declare module 'fastify' {
    export interface FastifyRequest {
        username?: string;
        email?: string;
        isAdmin?: boolean;
    }
}

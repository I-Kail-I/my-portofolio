import { FastifyInstance } from 'fastify';
import { auth } from '@/lib/auth';

export default async function authPlugin(app: FastifyInstance) {
  app.route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    async handler(request, reply) {
      const response = await auth.handler(
        new Request(request.url, {
          method: request.method,
          headers: request.headers as HeadersInit,
          body:
            request.method !== 'GET' ? JSON.stringify(request.body) : undefined,
        })
      );

      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);
    },
  });
}

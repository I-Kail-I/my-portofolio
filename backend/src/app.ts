import Fastify, { FastifyServerOptions } from 'fastify';
import authPlugin from '@/plugins/better-auth';
import fastifyHelmet from '@fastify/helmet';
import cors from '@fastify/cors';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyMultipart from '@fastify/multipart';

export function buildApp(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts);

  // Security headers
  app.register(fastifyHelmet);

  // Cors
  app.register(cors, {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  // Rate limitting
  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // File uploads
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5mb
    },
  });

  // Plugins
  app.register(authPlugin);

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  return app;
}

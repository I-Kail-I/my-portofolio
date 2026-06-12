import { FastifyInstance } from 'fastify';
import { buildApp } from '@/app';

let cachedApp: FastifyInstance | null = null;

/**
 * Builds a Fastify instance for testing
 * Reuses the same instance across tests for performance
 */
export async function getTestApp(): Promise<FastifyInstance> {
  if (cachedApp) {
    return cachedApp;
  }

  // Use buildApp() which includes all your routes, plugins, etc.
  const app = buildApp({
    logger: false, // Disable logger for tests
  });

  await app.ready();
  cachedApp = app;
  return app;
}

/**
 * Closes the test app (call in afterAll)
 */
export async function closeTestApp(): Promise<void> {
  if (cachedApp) {
    await cachedApp.close();
    cachedApp = null;
  }
}
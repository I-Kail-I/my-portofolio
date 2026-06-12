import { buildApp } from '@/app';

const app = buildApp({ logger: true });

const start = async () => {
  try {
    await app.listen({ port: 8000, host: '0.0.0.0' });
    console.log('Server started on port 8000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
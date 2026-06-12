# Fastify Template

Production-ready Fastify 5 backend starter with built-in authentication.

## Prerequisites

- Node.js 18+
- npm

## Quick Start

```bash
# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env

# Start development server
npm run dev
```

Server runs at `http://localhost:8000`.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production (tsup) |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |
| `npm test` | Run tests (watch mode) |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:ui` | Open Vitest UI |

## Docker

```bash
# Development
docker compose up --build

# Production
docker compose -f docker-compose.prod.yml up --build
```

## License

ISC

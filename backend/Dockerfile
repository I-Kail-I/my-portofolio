FROM node:24-alpine as base

WORKDIR /app

# Development stage
FROM base as dev
COPY package*.json ./
RUN npm ci
COPY . ./
CMD [ "npm", "run", "dev" ]

# Builder stage
FROM base as builder
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Production stage
FROM base as prod
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
CMD [ "npm", "start" ]

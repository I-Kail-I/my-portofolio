FROM node:24-alpine as base

WORKDIR /app

# DEVELOPMENT
FROM base as dev
COPY package*.json ./
RUN npm ci
CMD [ "npm", "run", "dev" ]

# BUILDER STAGE
FROM base as builder
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# PRODUCTION
FROM base as prod
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
CMD [ "npm", "start" ]

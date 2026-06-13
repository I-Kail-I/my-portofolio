FROM node:24-slim as base

WORKDIR /app

FROM base as dev
COPY package*.json ./
RUN npm ci
COPY . ./
ENV NODE_ENV=development
CMD [ "npm", "run", "dev" ]

FROM base as prod
USER root
COPY package*.json ./
RUN npm ci --omit=dev
COPY . ./
USER node
ENV ENV_NODE=production
CMD [ "npm", "run", "start" ]
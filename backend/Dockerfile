FROM node:24-slim as base

WORKDIR /app
USER root

FROM base as dev
COPY package*.json ./
RUN npm ci
COPY . ./
CMD [ "npm", "run", "dev" ]

FROM base as prod
COPY package*.json ./
RUN npm ci --omit=dev
COPY . ./
CMD [ "npm", "run", "start" ]
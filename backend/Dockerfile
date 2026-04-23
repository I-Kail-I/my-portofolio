FROM node:24-alpine as base
WORKDIR /app

# DEVELOPMENT
FROM base AS dev
COPY package*.json ./
RUN npm install
ENV NODE_ENV=development
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "dev" ]

# PRODUCTION
FROM base AS prod
COPY package*json ./
RUN npm install --omit=dev
ENV NODE_ENV=production
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]
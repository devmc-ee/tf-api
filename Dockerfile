FROM node:16-alpine as base
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli

COPY --chown=node:node package*.json ./

RUN npm ci
COPY --chown=node:node . .

FROM base as build
CMD ["npm", "run", "start:dev"]
USER node
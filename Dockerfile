FROM node:16-alpine
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli

COPY --chown=node:node package*.json ./

RUN npm ci
COPY --chown=node:node . .

CMD ["npm", "run", "start:dev"]
USER node
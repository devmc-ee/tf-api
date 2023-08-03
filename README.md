## Description

API gateway for multiple projects: 

### Resto: 
  * API for thaifood.ee contents
  * API for thaifood.ee admin panel

### Auth: 
  * API for auth 

## Tech stack
* [Nestjs](https://docs.nestjs.com/) framework (TS) powered with [Fastify](https://fastify.dev/)
* 
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# Makefile
make up-build
```

## Test

```bash
# build test
make up-test-build
# all tests in another terminal
make tests

```

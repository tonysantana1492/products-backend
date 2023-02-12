**Simple test!**

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with custom setup maintaining industry standard best practices. Just clone and start building without worrying about anything. Focus on the product not the setup.

## Overview

- `config/` setup - separated segment for each config
	- `app.config.ts`
	- `database.config.ts`
	- `jwt.config.ts`
- `authentication` module - JWT token based cookie authentication out of the box
- API validation and serialization
- Swagger Open API specification setup out of the box - check the `src/features/inventory/inventory.controller.ts` for examples
- MongoDB database
- Roles and Permissions based authorization setup - check out the `src/authorization` module. For implementation, check the `src/features/inventory` module

## Installation

```bash
$ npm install
```

## Config env variables
Rename __.env.example__ file to __.env__

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# with docker
$ docker-compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - __Tony Santana López__

## License

Nest is [MIT licensed](LICENSE).

# nestchat

This repository is a chatroom api server use socket.io-redis as pub/sub datasource, and use socket.io as protocol to transcend the data use the nestjs framework

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Modules
### Configure
```
This is the module to setup all configuration from .env file
```
### Winston
```
This is the logger for all system to generate logger
```

## Gateways
```
This is use for websocket protocal to response to client logic
```

## IoAdapter
```
This is use socket-io.redis to enable the use redis as broker for socket.io
```
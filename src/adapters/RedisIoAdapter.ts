import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as io from 'socket.io';
import * as redis from 'redis';
import {createAdapter} from 'socket.io-redis';
@Injectable()
export class RedisIoAdapter extends IoAdapter {
  private logger: Logger = new Logger('RedisAdapter');
  private app: any;
  constructor(app: NestExpressApplication, private readonly configService: ConfigService<{redis: {host: string, port: number, passwd: string}, port: number}>) {
    super();
    this.app = app;
  }
  createIOServer(port: number, options?: any): any {
    const httpServer = this.app.getHttpServer();
    // allowEIO3 allow the socket.io verion under 2 to connection
    const ioServer = new io.Server(httpServer, {...options, allowEIO3: true});
    this.logger.log({msg: "createIoServer"});    
    const server = ioServer;
    const redisHost = this.configService.get('redis.host', {infer: true});
    const redisPort = this.configService.get('redis.port', {infer: true});
    const redisPasswd = this.configService.get('redis.passwd', {infer: true});
    const subClient = redis.createClient(redisPort, redisHost, {auth_pass: redisPasswd, password: redisPasswd});
    const redisAdapter = createAdapter({
      subClient: subClient,
      pubClient: subClient.duplicate()
    });
    server.adapter(redisAdapter);
    return server;
  }
}
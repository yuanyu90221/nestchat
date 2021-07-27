import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { APP_INTERCEPTOR } from '@nestjs/core';
// self implementation 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminWsGateway } from './gateways/adminws.gateway';
import configuration from './config/configuration';
import { IoWsGateway } from './gateways/iows.gateway';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration]
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.json(),
      ),
    })
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  }, IoWsGateway, AdminWsGateway, AppService],
})
export class AppModule {}

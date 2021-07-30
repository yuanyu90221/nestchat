import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { APP_INTERCEPTOR } from '@nestjs/core';
// self implementation 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { WsModule } from './modules/ws/ws.module';

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
    }),
    WsModule
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  }, AppService],
})
export class AppModule {}

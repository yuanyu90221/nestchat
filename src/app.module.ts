import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IoWsGateway } from './gateways/iows.gateway';
import configuration from './config/configuration';
import { WinstonModule } from 'nest-winston';
import { AdminWsGateway } from './gateways/adminws.gateway';
import * as winston from 'winston';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env'],
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
  controllers: [],
  providers: [IoWsGateway, AdminWsGateway],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AdminWsGateway } from './gateways/adminws.gateway';
import { IoWsGateway } from './gateways/iows.gateway';

@Module({
  providers: [
    IoWsGateway, AdminWsGateway
  ]
})
export class WsModule {}

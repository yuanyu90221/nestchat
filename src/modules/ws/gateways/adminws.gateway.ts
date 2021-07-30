import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@Injectable()
@WebSocketGateway({transports: ['websocket'], allowUprade: false, pingTimeout: 10000, pingInterval: 30000, path: "/admin_ws"})
export class AdminWsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AdminWsGateway');

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  afterInit(server: Server) {
    this.logger.log({msg: "Init"})
  }

  handleDisconnect(client: Socket) {
    this.logger.log({msg: `Client discconected`, id: client.id});
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log({msg: `Client connected`, id: client.id});
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@Injectable()
@WebSocketGateway({transports: ['websocket'], allowUprade: false, pingTimeout: 10000, pingInterval: 30000, path: "/io_ws"})
export class IoWsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('IoWsGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log({payload});
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log({msg: 'Init'});
  }
  
  handleDisconnect(client: Socket) {
    this.logger.log({msg: `Client discconected`, id: client.id});
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log({msg: `Client connected`, id: client.id});
  }
}

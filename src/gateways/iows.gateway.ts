import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ErrorCatagory } from '../exceptions/ErrorCatagory.enum';
import { WsUnauthException } from '../exceptions/WsUnauth.exception';
@Injectable()
@WebSocketGateway({transports: ['websocket'], allowUprade: false, pingTimeout: 10000, pingInterval: 30000, path: "/io_ws", verifyClient:(logger:Logger)=>(socket, next)=> {
  const header =  socket.handshake.headers;
  const {user_id, product_id} = header;
  const error = new WsUnauthException(ErrorCatagory.WsSseUnauthException, `please check parameters,sse get api paramter not correct`);
  logger.log({error: error.getError()});
  if (!user_id || !product_id) {
    next(error);
  } else {
    next();
  }
}})
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

  async handleConnection(client: Socket, ...args: any[]) {
    const header =  client.handshake.headers;
    const {user_id, product_id} = header;
    this.logger.log({msg: `Client connected`, id: client.id, user_id, product_id});
    // TODO: add add room with client_id
  }
}

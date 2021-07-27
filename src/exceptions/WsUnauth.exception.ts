import { WsException } from "@nestjs/websockets";

export class WsUnauthException extends WsException {
  public data: Object;
  constructor(errCode: number, message: string) {
    super({errCode, message});
    this.message = message;
    this.data = this.getError();
  }
}
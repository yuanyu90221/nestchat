import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface HealthStatus {
  isHealth: boolean;
  message: string;
}
@Injectable()
export class AppService {
  private logger: Logger = new Logger('AppService');
  constructor(private readonly configService: ConfigService<{APP_NAME:string}>) {}
  
  getStatus(): HealthStatus{
    this.logger.log({msg: 'getStatus'});
    return {
      message: `${this.configService.get('APP_NAME')} is healthy`,
      isHealth: true
    }
  }
}

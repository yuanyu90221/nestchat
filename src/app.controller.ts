import { Controller, Get } from '@nestjs/common';
import { AppService, HealthStatus } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health_check')
  getStatus(): HealthStatus {
    return this.appService.getStatus();
  }
}

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';
import { RedisIoAdapter } from './adapters/RedisIoAdapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    logger: false
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.set('trust proxy',1);
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.useStaticAssets(join(__dirname, '..', 'static'));
  const config = app.get(ConfigService);
  app.useWebSocketAdapter(new RedisIoAdapter(app, config));
  await app.listen(config.get('port'));
}
bootstrap();

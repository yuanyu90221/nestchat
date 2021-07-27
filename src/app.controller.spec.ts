import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: ConfigService,
        useValue: {
          get: jest.fn((key: string) => {
            if (key === 'APP_NAME') {
              return "nestchat"
            }
            return null
          })
        }
      },AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('isHealthy should be true', () => {
      expect(appController.getStatus().isHealth).toBe(true);
    });
  });
});

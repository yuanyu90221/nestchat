import { Test, TestingModule } from '@nestjs/testing';
import { IoWsGateway } from './iows.gateway';
jest.mock('./iows.gateway');
describe('IoWsGateway', () => {
  let gateway: IoWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IoWsGateway],
    }).compile();

    gateway = module.get<IoWsGateway>(IoWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

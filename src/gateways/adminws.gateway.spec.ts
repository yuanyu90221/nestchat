import { Test, TestingModule } from '@nestjs/testing';
import { AdminWsGateway } from './adminws.gateway';

describe('AdminioGateway', () => {
  let gateway: AdminWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminWsGateway],
    }).compile();

    gateway = module.get<AdminWsGateway>(AdminWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

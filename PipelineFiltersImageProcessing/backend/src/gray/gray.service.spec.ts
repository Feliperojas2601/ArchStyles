import { Test, TestingModule } from '@nestjs/testing';
import { GrayService } from './gray.service';

describe('GrayService', () => {
  let service: GrayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrayService],
    }).compile();

    service = module.get<GrayService>(GrayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

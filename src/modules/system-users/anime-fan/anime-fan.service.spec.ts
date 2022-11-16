import { Test, TestingModule } from '@nestjs/testing';
import { AnimeFanService } from './anime-fan.service';

describe('AnimeFanService', () => {
  let service: AnimeFanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeFanService],
    }).compile();

    service = module.get<AnimeFanService>(AnimeFanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

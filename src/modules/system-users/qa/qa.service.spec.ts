import { Test, TestingModule } from '@nestjs/testing';
import { QAService } from './qa.service';

describe('QAService', () => {
  let service: QAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QAService],
    }).compile();

    service = module.get<QAService>(QAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { QAController } from './qa.controller';
import { QAService } from './qa.service';

describe('QAController', () => {
  let controller: QAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QAController],
      providers: [QAService],
    }).compile();

    controller = module.get<QAController>(QAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

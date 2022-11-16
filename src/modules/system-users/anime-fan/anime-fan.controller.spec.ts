import { Test, TestingModule } from '@nestjs/testing';
import { AnimeFanController } from './anime-fan.controller';
import { AnimeFanService } from './anime-fan.service';

describe('AnimeFanController', () => {
  let controller: AnimeFanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeFanController],
      providers: [AnimeFanService],
    }).compile();

    controller = module.get<AnimeFanController>(AnimeFanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

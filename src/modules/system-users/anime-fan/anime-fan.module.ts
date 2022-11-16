import { Module } from '@nestjs/common';
import { AnimeFanService } from './anime-fan.service';
import { AnimeFanController } from './anime-fan.controller';

@Module({
  controllers: [AnimeFanController],
  providers: [AnimeFanService]
})
export class AnimeFanModule {}

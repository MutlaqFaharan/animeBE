import { Module } from '@nestjs/common';
import { AnimeFanService } from './anime-fan.service';
import { AnimeFanController } from './anime-fan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/entities/user.entity';

@Module({
  controllers: [AnimeFanController],
  providers: [AnimeFanService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class AnimeFanModule {}

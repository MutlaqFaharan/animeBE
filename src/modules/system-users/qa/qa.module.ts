import { Module } from '@nestjs/common';
import { QAService } from './qa.service';
import { QAController } from './qa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  controllers: [QAController],
  providers: [QAService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [QAService],
})
export class QAModule {}

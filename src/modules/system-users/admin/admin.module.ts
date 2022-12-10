import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { QAModule } from '../qa/qa.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    QAModule,
  ],
})
export class AdminModule {}

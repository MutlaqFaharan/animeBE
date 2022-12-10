import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AdminModule } from './admin/admin.module';
import { QAModule } from './qa/qa.module';
import { AnimeFanModule } from './anime-fan/anime-fan.module';
import { QAService } from './qa/qa.service';
import { AdminService } from './admin/admin.service';
import { AnimeFanService } from './anime-fan/anime-fan.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/entities/user.entity';

@Module({
  controllers: [],
  providers: [UserService, QAService, AdminService, AnimeFanService],
  imports: [
    AdminModule,
    UserModule,
    QAModule,
    AnimeFanModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  exports: [
    MongooseModule,
    AdminModule,
    UserModule,
    QAModule,
    AnimeFanModule,
    UserService,
    QAService,
    AdminService,
    AnimeFanService,
  ],
})
export class SystemUsersModule {}

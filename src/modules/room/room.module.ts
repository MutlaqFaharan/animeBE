import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../system-users/user/user.module';
import { Room, RoomSchema } from './entities/room.entity';
import { RoomService } from './room.service';

@Module({
  controllers: [],
  providers: [RoomService],
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    UserModule,
  ],
  exports: [RoomService],
})
export class RoomModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { EventsModule } from './events/events.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    SystemUsersModule,
    ContentModule,
    AuthModule,
    EventsModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    SystemUsersModule,
    ContentModule,
    AuthModule,
    EventsModule,
    RoomModule,
  ],
})
export class ModulesModule {}

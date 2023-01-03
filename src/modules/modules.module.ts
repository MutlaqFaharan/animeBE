import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [SystemUsersModule, ContentModule, AuthModule, EventsModule],
  controllers: [],
  providers: [],
  exports: [SystemUsersModule, ContentModule, AuthModule],
})
export class ModulesModule {}

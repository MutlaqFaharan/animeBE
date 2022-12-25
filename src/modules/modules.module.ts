import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { SystemUsersModule } from './system-users/system-users.module';

@Module({
  imports: [SystemUsersModule, ContentModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [SystemUsersModule, ContentModule, AuthModule],
})
export class ModulesModule {}

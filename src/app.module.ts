import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule } from 'nestjs-i18n';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';

import {
  GlobalCustomExceptionFilter,
  GlobalCustomExceptionInterceptor,
  GlobalRolesGuard,
  I18nOptions,
} from './shared/config-constants/app.configuration';
import { ServerLogger } from './services/logger/server-logger';
import { ServicesModule } from './services/services.module';
import { PassportModule } from '@nestjs/passport';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SystemUsersModule } from './modules/system-users/system-users.module';
import { ContentModule } from './modules/content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ServicesModule,
    SystemUsersModule,
    ContentModule,
    AuthModule,
    I18nModule.forRoot(I18nOptions),
    PassportModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GlobalCustomExceptionFilter,
    GlobalCustomExceptionInterceptor,
    ServerLogger,
    GlobalRolesGuard,
  ],
})
export class AppModule {}

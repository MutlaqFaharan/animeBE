import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule } from 'nestjs-i18n';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ServerLogger } from './services/logger/server-logger';
import { ServicesModule } from './services/services.module';
import { PassportModule } from '@nestjs/passport';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SystemUsersModule } from './modules/system-users/system-users.module';
import { ContentModule } from './modules/content/content.module';
import { DecoratorsModule } from './shared/decorators/decorators.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { I18nOptions, ThrottlerOptions } from './shared/configs/app-options';
import {
  GlobalFilters,
  GlobalGuards,
  GlobalInterceptors,
} from './shared/configs/app.configs';
import { GuardModule } from './guards/guard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    SystemUsersModule,
    ContentModule,
    GuardModule,
    ServicesModule,
    AuthModule,
    DecoratorsModule,
    I18nModule.forRoot(I18nOptions),
    PassportModule,
    CloudinaryModule,
    ThrottlerModule.forRoot(ThrottlerOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ServerLogger,
    ...GlobalGuards,
    ...GlobalFilters,
    ...GlobalInterceptors,
  ],
})
export class AppModule {}

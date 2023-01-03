import { ModulesModule } from './modules/modules.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { I18nModule } from 'nestjs-i18n';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';
import { PassportModule } from '@nestjs/passport';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DecoratorsModule } from './shared/decorators/decorators.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { I18nOptions, ThrottlerOptions } from './shared/configs/app-options';
import {
  GlobalFilters,
  GlobalGuards,
  GlobalInterceptors,
  GlobalServices,
} from './shared/configs/app.configs';
import { GuardModule } from './guards/guard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ThrottlerModule.forRoot(ThrottlerOptions),
    I18nModule.forRoot(I18nOptions),
    GuardModule,
    ServicesModule,
    DecoratorsModule,
    PassportModule,
    CloudinaryModule,
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [
    ...GlobalServices,
    ...GlobalGuards,
    ...GlobalFilters,
    ...GlobalInterceptors,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ServerLogger } from './logger/server-logger';

@Module({
  controllers: [],
  providers: [ServerLogger],
  imports: [],
  exports: [ServerLogger],
})
export class ServicesModule {}

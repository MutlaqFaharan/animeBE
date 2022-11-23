import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnimeFanService } from './anime-fan.service';
import { UniqueEmailUsernameQuery } from './dto/unique-email-username.query';

@ApiTags('anime-fan')
@Controller('anime-fan')
export class AnimeFanController {
  constructor(private readonly animeFanService: AnimeFanService) {}

  @Get('unique-email-username')
  uniqueProperty(@Query() query: UniqueEmailUsernameQuery) {
    return this.animeFanService.uniqueProperty(query);
  }
}

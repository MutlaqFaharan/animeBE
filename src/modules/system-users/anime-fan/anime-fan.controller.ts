import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnimeFanService } from './anime-fan.service';

@ApiTags('anime-fan')
@Controller('anime-fan')
export class AnimeFanController {
  constructor(private readonly animeFanService: AnimeFanService) {}
}

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
import { CreateAnimeFanDto } from './dto/create-anime-fan.dto';
import { UpdateAnimeFanDto } from './dto/update-anime-fan.dto';

@ApiTags('anime-fan')
@Controller('anime-fan')
export class AnimeFanController {
  constructor(private readonly animeFanService: AnimeFanService) {}

  @Post()
  create(@Body() createAnimeFanDto: CreateAnimeFanDto) {
    return this.animeFanService.create(createAnimeFanDto);
  }

  @Get()
  findAll() {
    return this.animeFanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeFanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnimeFanDto: UpdateAnimeFanDto,
  ) {
    return this.animeFanService.update(+id, updateAnimeFanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeFanService.remove(+id);
  }
}

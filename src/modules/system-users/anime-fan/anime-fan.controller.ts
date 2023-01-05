import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { MongoDBIDPipe } from 'src/shared/pipes/mongo-id.pipe';
import { AnimeFanService } from './anime-fan.service';
import { SearchUsersQueryDto } from './dto/search-users-query.dto';
import { UniqueEmailUsernameQuery } from './dto/unique-email-username.query';

@ApiTags('anime-fan')
@Controller('anime-fan')
@UseGuards(JwtAuthGuard)
export class AnimeFanController {
  constructor(private readonly animeFanService: AnimeFanService) {}

  @Get('unique-email-username')
  uniqueProperty(@Query() query: UniqueEmailUsernameQuery) {
    return this.animeFanService.uniqueProperty(query);
  }

  @Get()
  findAll(@Query() query: SearchUsersQueryDto) {
    return this.animeFanService.findAll(query);
  }

  @Get(':animeFanID')
  findOne(
    @Param('animeFanID', new MongoDBIDPipe())
    animeFanID: Types.ObjectId,
  ) {
    return this.animeFanService.findOne(animeFanID);
  }

  @Roles(Role.AnimeFan)
  @Patch(':animeFanID')
  followUser(
    @Param('animeFanID', new MongoDBIDPipe())
    animeFanID: Types.ObjectId,
    @Req() req: any,
  ) {
    return this.animeFanService.followUser(animeFanID, req.user._id);
  }
}

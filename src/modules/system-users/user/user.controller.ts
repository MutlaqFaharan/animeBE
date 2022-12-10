import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { MongoDBIDPipe } from 'src/shared/pipes/mongo-id.pipe';
import mongoose from 'mongoose';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userID')
  getProfile(
    @Param('userID', new MongoDBIDPipe())
    userID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.userService.findOneByID(userID);
  }

  @Put(':userID')
  editProfile(
    @Param('userID', new MongoDBIDPipe())
    userID: mongoose.Schema.Types.ObjectId,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.editProfile(userID, updateProfileDto);
  }
}

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
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { MongoDBIDPipe } from 'src/shared/pipes/mongo-id.pipe';
import mongoose from 'mongoose';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userID')
  uniqueProperty(
    @Param('userID', new MongoDBIDPipe())
    userID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.userService.findOneByID(userID);
  }
}

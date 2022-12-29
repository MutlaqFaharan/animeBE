import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import mongoose from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { MongoDBIDPipe } from 'src/shared/pipes/mongo-id.pipe';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { Patch } from '@nestjs/common/decorators';

@ApiTags('posts')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(Role.AnimeFan)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postService.create(createPostDto, req.user._id);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.postService.findAll(query);
  }

  @Get(':postID')
  findOne(
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.postService.findOne(postID);
  }

  @Get(':postID/likes')
  findLikers(
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.postService.findLikers(postID);
  }


  @Roles(Role.AnimeFan, Role.QA, Role.Admin)
  @Put(':postID')
  update(
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(postID, updatePostDto);
  }

  @Roles(Role.AnimeFan)
  @Patch(':postID/like')
  likePost(
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
    @Req() req,
  ) {
    return this.postService.likePost(postID, req?.user?._id);
  }

  @Roles(Role.AnimeFan, Role.Admin)
  @Delete(':postID')
  remove(
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.postService.remove(postID);
  }
}

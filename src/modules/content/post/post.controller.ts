import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import mongoose from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }
  // TODO: Paginated
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':postID')
  findOne(@Param('postID') postID: mongoose.Schema.Types.ObjectId) {
    return this.postService.findOne(postID);
  }

  @Put(':postID')
  update(
    @Param('postID') postID: mongoose.Schema.Types.ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(postID, updatePostDto);
  }

  @Delete(':postID')
  remove(@Param('postID') postID: mongoose.Schema.Types.ObjectId) {
    return this.postService.remove(postID);
  }
}

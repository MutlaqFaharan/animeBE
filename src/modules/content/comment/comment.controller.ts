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
import mongoose from 'mongoose';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('posts/:postID/comments')
@Controller('posts/:postID/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postID') postID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.commentService.create(createCommentDto, postID);
  }

  @Get()
  findAll(@Param('postID') postID: mongoose.Schema.Types.ObjectId) {
    return this.commentService.findAll(postID);
  }

  @Patch(':commentID')
  update(
    @Param('commentID') commentID: mongoose.Schema.Types.ObjectId,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('postID') postID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.commentService.update(commentID, updateCommentDto, postID);
  }

  @Delete(':id')
  remove(
    @Param('postID') postID: mongoose.Schema.Types.ObjectId,
    @Param('commentID') commentID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.commentService.remove(commentID, postID);
  }
}

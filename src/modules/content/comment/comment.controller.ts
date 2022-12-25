import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { MongoDBIDPipe } from 'src/shared/pipes/mongo-id.pipe';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('posts/:postID/comments')
@Controller('posts/:postID/comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
    @Req() req: any,
  ) {
    return this.commentService.create(createCommentDto, postID, req.user._id);
  }

  @Get()
  findAll(
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.commentService.findAll(postID);
  }

  @Patch(':commentID')
  update(
    @Param('commentID', new MongoDBIDPipe())
    commentID: mongoose.Schema.Types.ObjectId,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.commentService.update(commentID, updateCommentDto, postID);
  }

  @Delete(':id')
  remove(
    @Param('postID', new MongoDBIDPipe())
    postID: mongoose.Schema.Types.ObjectId,
    @Param('commentID', new MongoDBIDPipe())
    commentID: mongoose.Schema.Types.ObjectId,
  ) {
    return this.commentService.remove(commentID, postID);
  }
}

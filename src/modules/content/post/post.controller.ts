import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import mongoose from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';

@ApiTags('posts')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post() /////
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postService.create(createPostDto, req.user._id);
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

  @Roles(Role.AnimeFan, Role.QA, Role.Admin)
  @Put(':postID')
  update(
    @Param('postID') postID: mongoose.Schema.Types.ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(postID, updatePostDto);
  }

  @Roles(Role.AnimeFan, Role.Admin)
  @Delete(':postID')
  remove(@Param('postID') postID: mongoose.Schema.Types.ObjectId) {
    return this.postService.remove(postID);
  }
}

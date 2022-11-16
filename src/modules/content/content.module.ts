import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { CommentService } from './comment/comment.service';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';

@Module({
  providers: [PostService, CommentService],
  imports: [PostModule, CommentModule],
  exports: [PostModule, CommentModule, PostService, CommentService],
})
export class ContentModule {}

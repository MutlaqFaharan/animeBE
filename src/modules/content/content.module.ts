import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

@Module({
  providers: [],
  imports: [PostModule, CommentModule],
  exports: [PostModule, CommentModule],
})
export class ContentModule {}

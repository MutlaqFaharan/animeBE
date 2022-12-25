import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './entities/comment.entity';
import { PostModule } from '../post/post.module';
import { UserModule } from 'src/modules/system-users/user/user.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    PostModule,
    UserModule,
  ],
  exports: [MongooseModule],
})
export class CommentModule {}

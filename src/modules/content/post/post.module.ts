import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './entities/post.entity';
import { SystemUsersModule } from 'src/modules/system-users/system-users.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    SystemUsersModule,
  ],
  exports: [MongooseModule, PostService],
})
export class PostModule {}

import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './entities/post.entity';
import { UserModule } from 'src/modules/system-users/user/user.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    UserModule,
  ],
  exports: [MongooseModule, PostService],
})
export class PostModule {}

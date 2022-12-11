import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { validID } from 'src/shared/db-error-handling/valid-id.middleware';
import { currentDate } from 'src/shared/util/date.util';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<PostDocument>) {}

  create(
    createPostDto: CreatePostDto,
    animeFanID: mongoose.Schema.Types.ObjectId,
  ): Promise<Post> {
    const post = new this.postModel(createPostDto);
    post.author = animeFanID;
    return post.save();
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel
      .find()
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'comments',
          model: 'Comment',
        },
      })
      .exec();
    if (posts.length > 0) {
      return posts;
    }
    throw new HttpException(`Posts not Found`, HttpStatus.NOT_FOUND);
  }

  async findOne(postID: mongoose.Schema.Types.ObjectId): Promise<Post> {
    validID(postID);
    const post = await this.postModel
      .findById(postID)
      .populate('comments')
      .exec();
    emptyDocument(post, 'Post');
    return post;
  }

  async update(
    postID: mongoose.Schema.Types.ObjectId,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    validID(postID);
    let post = await this.postModel.findByIdAndUpdate(postID, updatePostDto);
    emptyDocument(post, 'Post');
    post.updateDate = currentDate;
    post.isNew = false;
    await post.save();
    return post;
  }

  async remove(postID: mongoose.Schema.Types.ObjectId): Promise<Post> {
    validID(postID);
    const post = await this.postModel.findByIdAndRemove(postID).exec();
    emptyDocument(post, 'Post');
    return post;
  }
}

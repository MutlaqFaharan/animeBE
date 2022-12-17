import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserService } from 'src/modules/system-users/user/user.service';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import { checkArrayNullability } from 'src/shared/util/check-nullability.util';
import { currentDate } from 'src/shared/util/date.util';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private postModel: Model<PostDocument>,
    private readonly userService: UserService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    animeFanID: mongoose.Schema.Types.ObjectId,
  ): Promise<Post> {
    const post = new this.postModel(createPostDto);
    const user = await this.userService.findOneByIDAsDocument(animeFanID);
    user.posts.push(post._id);
    post.author = animeFanID;
    await user.save();
    return post.save();
  }

  async findAll(query: PaginationDto): Promise<Post[]> {
    const { skip, limit } = query;
    const posts = await this.postModel
      .find()
      .where({ isDeleted: false })
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'comments',
          model: 'Comment',
        },
      })
      .populate('author')
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .exec();

    emptyDocument(posts, 'post');
    return posts;
  }

  async findOne(postID: mongoose.Schema.Types.ObjectId): Promise<Post> {
    const post = await this.postModel
      .findById(postID)
      .where({ isDeleted: false })
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'comments',
          model: 'Comment',
        },
      })
      .exec();
    emptyDocument(post, 'post');
    return post;
  }

  async update(
    postID: mongoose.Schema.Types.ObjectId,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    let post = await this.postModel.findByIdAndUpdate(postID, updatePostDto);
    emptyDocument(post, 'post');
    post.updateDate = currentDate;
    post.isNew = false;
    await post.save();
    return post;
  }

  async remove(postID: mongoose.Schema.Types.ObjectId): Promise<Post> {
    const post = await this.postModel.findByIdAndUpdate(postID, {
      isDeleted: true,
    });
    emptyDocument(post, 'Post');
    return post;
  }

  async likePost(
    postID: mongoose.Schema.Types.ObjectId,
    animeFanID: mongoose.Schema.Types.ObjectId,
  ): Promise<ReturnMessage> {
    const post = await this.postModel
      .findById(postID)
      .where({ isDeleted: false });
    post.likes.push(animeFanID);
    const user = await this.userService.findOneByIDAsDocument(animeFanID);
    user.likedPosts.push(postID);
    await user.save();
    await post.save();
    return {
      message: 'post.success.like',
      statusCode: 200,
    };
  }
}

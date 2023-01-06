import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/modules/system-users/user/entities/user.entity';
import { UserService } from 'src/modules/system-users/user/user.service';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { ReturnMessage } from 'src/shared/interfaces/general/return-message.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
    private readonly userService: UserService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    animeFanID: Types.ObjectId,
  ): Promise<Post> {
    const post = new this.postModel(createPostDto);
    const animeFan = await this.userService.findOneByIDAsDocument(animeFanID);
    animeFan.posts.push(post._id);
    post.author = animeFan._id;
    await animeFan.save();
    return post.save();
  }

  async findAll(query: PaginationDto): Promise<Post[]> {
    const { skip, limit } = query;
    const posts = await this.postModel
      .find()
      .where({ isDeleted: false })
      .populate('author')
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .exec();
    return posts;
  }

  async findOne(postID: Types.ObjectId): Promise<Post> {
    const post = await this.postModel
      .findById(postID)
      .where({ isDeleted: false })
      .populate('author')
      .exec();
    return post;
  }

  async findLikers(postID: Types.ObjectId): Promise<Post> {
    const post = await this.postModel
      .findById(postID)
      .where({ isDeleted: false })
      .populate('author')
      .populate('likes')
      .exec();
    return post;
  }

  async update(
    postID: Types.ObjectId,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    let post = await this.postModel.findByIdAndUpdate(postID, updatePostDto);
    emptyDocument(post, 'post');
    post.isNew = false;
    await post.save();
    return post;
  }

  async remove(postID: Types.ObjectId): Promise<Post> {
    const post = await this.postModel.findByIdAndUpdate(postID, {
      isDeleted: true,
    });
    emptyDocument(post, 'Post');
    return post;
  }

  async likePost(
    postID: Types.ObjectId,
    animeFanID: Types.ObjectId,
  ): Promise<ReturnMessage> {
    const post = await this.postModel
      .findById(postID)
      .where({ isDeleted: false });
    const animeFan = await this.userService.findOneByIDAsDocument(animeFanID);
    this.likeUnlike(post, animeFan);
    await animeFan.save();
    await post.save();
    return {
      message: 'post.success.like',
      statusCode: 200,
    };
  }

  likeUnlike(post: Post, animeFan: User) {
    if (post.likes.indexOf(animeFan._id) !== -1) {
      post.likes.splice(post.likes.indexOf(animeFan), 1);
      animeFan.likedPosts.splice(animeFan.likedPosts.indexOf(post._id));
    } else {
      post.likes.push(animeFan._id);
      animeFan.likedPosts.push(post._id);
    }
  }
}

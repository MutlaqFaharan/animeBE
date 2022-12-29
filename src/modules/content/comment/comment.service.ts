import { Injectable  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserService } from 'src/modules/system-users/user/user.service';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { ReturnMessage } from 'src/shared/interfaces/general/return-message.interface';
import { checkNullability } from 'src/shared/util/check-nullability.util';
import { currentDate } from 'src/shared/util/date.util';
 import { PostService } from '../post/post.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private commentModel: Model<CommentDocument>,
    private postService: PostService,
    private userService: UserService,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    postID: mongoose.Schema.Types.ObjectId,
    animeFanID: mongoose.Schema.Types.ObjectId,
  ): Promise<ReturnMessage> {
    const { replyTo, text } = createCommentDto;
    const subCreateCommentDto = { text };

    const animeFan = await this.userService.findOneByIDAsDocument(animeFanID);
    const post = await this.postService.findOne(postID);
    const comment = new this.commentModel(subCreateCommentDto);

    comment.author = animeFan._id;
    comment.post = post._id
    post.comments.push(comment._id);

    if (checkNullability(replyTo)) {
      const originalComment = await this.findOne(replyTo);
      comment.replyTo = originalComment._id
      originalComment.comments.push(comment._id);
      await originalComment.save();
    }

    await animeFan.save();
    await post.save();
    await comment.save();

    return {
      message: 'comment.success.create',
      statusCode: 201,
    };
  }

  async findAll(postID: mongoose.Schema.Types.ObjectId): Promise<Comment[]> {
    return this.commentModel
    .find({post: postID})
    .populate('comments')

 
  }

  async update(
    commentID: mongoose.Schema.Types.ObjectId,
    createCommentDto: UpdateCommentDto,
    postID: mongoose.Schema.Types.ObjectId,
  ): Promise<CommentDocument> {
    // TODO: Authorization
    const post = await this.postService.findOne(postID);
    emptyDocument(post, 'Post');
    let comment = await this.commentModel.findByIdAndUpdate(
      commentID,
      createCommentDto,
    );
    emptyDocument(comment, 'Comment');
    comment.updateDate = currentDate;
    comment.isNew = false;
    return comment.save();
  }

  async remove(
    commentID: mongoose.Schema.Types.ObjectId,
    postID: mongoose.Schema.Types.ObjectId,
  ): Promise<CommentDocument> {
    const post = await this.postService.findOne(postID);
    emptyDocument(post, 'Post');
    let comment = await this.commentModel.findByIdAndRemove(commentID);
    console.log(comment);

    emptyDocument(comment, 'Comment');
    return comment;
  }

  findOne(commentID: mongoose.Schema.Types.ObjectId) {
    return this.commentModel.findById(commentID);
  }
}

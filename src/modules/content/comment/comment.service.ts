import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { currentDate } from 'src/shared/util/date.util';
import { PostDocument } from '../post/entities/post.entity';
import { PostService } from '../post/post.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private commentModel: Model<CommentDocument>,
    @InjectModel('Post') private postModel: Model<PostDocument>,
    private postService: PostService,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    postID: mongoose.Schema.Types.ObjectId,
  ): Promise<any> {
    // const comment = new this.commentModel(createCommentDto);
    // const post = await this.postService.findOne(postID);
    // emptyDocument(post, 'Post');
    // comment.post = postID;
    // if (createCommentDto.replayTo) {
    //   const repliedToComment = await this.commentModel.findOne({
    //     _id: createCommentDto.replayTo,
    //   });
    //   emptyDocument(repliedToComment, 'Comment');
    //   const originalComment: Comment =
    //     await this.sharedService.findParentComment(repliedToComment);
    //   // if a comment is a replay, push it to the original parent comment.comments
    //   originalComment?.comments?.push(comment._id);
    //   // and save the comment who got replied to
    //   comment.replayTo = createCommentDto?.replayTo;
    //   originalComment.updateDate = currentDate;
    //   originalComment.isNew = false;
    //   await originalComment.save();
    // } else {
    //   // else this is the original comment
    //   comment.replayTo = null;
    //   post?.comments?.push(comment._id);
    //   await post.save();
    // }
    // return comment.save();
  }

  async findAll(
    postID: mongoose.Schema.Types.ObjectId,
  ): Promise<mongoose.Schema.Types.ObjectId[] | HttpException> {
    // TODO: Populate with User
    const post = await this.postModel
      .findById(postID)
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'comments',
          model: 'Comment',
        },
      })
      .select('comments');
    emptyDocument(post, 'Post');
    if (post.comments.length > 0) {
      return post.comments;
    }
    throw new HttpException(`Comments not Found`, HttpStatus.NOT_FOUND);
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
}

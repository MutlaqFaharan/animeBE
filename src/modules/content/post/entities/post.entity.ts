import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/system-users/user/entities/user.entity';
import { Basic } from 'src/shared/entities/basic.entity';
import { Comment } from '../../comment/entities/comment.entity';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  validateBeforeSave: true,
})
export class Post extends Basic {
  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;

  @Prop({ type: String })
  text: string;

  @Prop({
    type: [{ type: String }],
  })
  images: string[];

  @Prop({
    type: [{ type: String }],
  })
  videos: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post Author is required'],
  })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  views: User[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

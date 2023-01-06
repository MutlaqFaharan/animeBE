import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';
import { User } from 'src/modules/system-users/user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  validateBeforeSave: true,
})
export class Post extends Document {
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
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Post Author is required'],
  })
  author: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  views: User[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

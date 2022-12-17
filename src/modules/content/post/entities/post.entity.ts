import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Basic } from 'src/shared/entities/basic.entity';

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
  author: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  views: mongoose.Schema.Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

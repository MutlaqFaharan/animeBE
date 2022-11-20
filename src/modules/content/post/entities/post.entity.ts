import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Basic } from 'src/shared/entities/basic.entity';
import { Video } from 'src/shared/interfaces/media.interface';
import { Image } from 'src/shared/interfaces/media.interface';

export type PostDocument = Post & Document;

@Schema({
  validateBeforeSave: true,
})
export class Post extends Basic {
  @Prop({ type: String })
  text: string;

  @Prop({
    type: [
      {
        url: String,
        filename: String,
      },
    ],
  })
  images: Image[];

  @Prop({
    type: [
      {
        url: String,
        filename: String,
      },
    ],
  })
  videos: Video[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: mongoose.Schema.Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

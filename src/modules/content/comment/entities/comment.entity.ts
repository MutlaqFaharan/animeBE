import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, NullExpression } from 'mongoose';
import { Basic } from 'src/shared/entities/basic.entity';

/**
 * #### All comments will have only one level of nesting
 * @Example Comment: Hi id 1
 *          Replay to Hi : Hi back id 2, replied to id=1
 *          Any replay to "Hi back" id 3, replied to id=2 will count as a reply to id=1
 */
export type CommentDocument = HydratedDocument<Comment>;

@Schema({
  validateBeforeSave: true,
})
export class Comment extends Basic {
  @Prop({ type: String })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: mongoose.Schema.Types.ObjectId;
  /*
  comments on the specified comment
  example
  - "Hi this is a comment"
  -- "Hi this is a replay"
  -- "Another replay"
  */
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: mongoose.Schema.Types.ObjectId[]; // the comments replaying to the specified comment

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  replayTo?: mongoose.Schema.Types.ObjectId | NullExpression; // if the comment is a replay to another comment it will have an id else it will be null
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

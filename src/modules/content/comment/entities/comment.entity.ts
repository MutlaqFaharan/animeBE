import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, NullExpression, Types } from 'mongoose';
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

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'A comment Must Have An Author'],
  })
  author: Types.ObjectId;
  /*
  comments on the specified comment
  example
  - "Hi this is a comment"
  -- "Hi this is a replay"
  -- "Another replay"
  */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[]; // the comments replaying to this comment

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Post',
    required: [true, 'A Comment Must Belong to a Post'],
  })
  post: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  replyTo?: Types.ObjectId | NullExpression; // if the comment is a replay to another comment it will have an id else it will be null

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

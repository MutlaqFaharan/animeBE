import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Comment } from 'src/modules/content/comment/entities/comment.entity';
import { Post } from 'src/modules/content/post/entities/post.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Role } from 'src/shared/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class User extends Document {
  @Prop({
    type: String,
    minlength: [5, 'Email must be more than 5 characters'],
    lowercase: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Exclude()
  @Prop({
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be more than 8 characters'],
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be more than three characters'],
    lowercase: true,
    trim: true,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    required: [true, 'Birthday must be provided'],
  })
  birthday: string;

  @Prop({
    type: String,
  })
  profilePicture: string;

  @Prop({
    type: String,
  })
  coverPicture: string;

  @Prop({
    type: String,
    required: [true, 'Role is Required'],
    enum: Role,
  })
  role: Role;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  likedPosts: Post[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  followers: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  following: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  blockedUsers: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Room' }] })
  rooms: Room[];
}
export const UserSchema = SchemaFactory.createForClass(User);

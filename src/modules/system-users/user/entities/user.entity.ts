import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { Basic } from 'src/shared/entities/basic.entity';
import { Role } from 'src/shared/enums/role.enum';

export type UserDocument = User & Document;

@Schema({
  validateBeforeSave: true,
})
export class User extends Basic {
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
    required: [true, 'Role is Required'],
    enum: Role,
  })
  role: Role;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  followers: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  following: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  blockedUsers: mongoose.Schema.Types.ObjectId[];
}
export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/modules/system-users/user/entities/user.entity';

export type RoomDocument = HydratedDocument<Room>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Room extends Document {
  @Prop({
    type: String,
    minlength: [2, 'Room Name must be more than 2 characters'],
    maxlength: [30, 'Room Name must be more than 30 characters'],
    trim: true,
    lowercase: true,
  })
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId }],
    ref: 'User',
  })
  users: User[];

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Room Author is required'],
  })
  author: User;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

import { Types } from 'mongoose';
import { User } from 'src/modules/system-users/user/entities/user.entity';

export interface RoomI {
  _id?: Types.ObjectId;
  name?: string;
  users?: User[];
}

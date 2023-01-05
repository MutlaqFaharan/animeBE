import { Types } from "mongoose";

export interface TokenPayload {
  _id: Types.ObjectId;
  username: string;
  role: number;
}

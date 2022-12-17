import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import { User, UserDocument } from '../user/entities/user.entity';
import { UniqueEmailUsernameQuery } from './dto/unique-email-username.query';

@Injectable()
export class AnimeFanService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  uniqueProperty(query: UniqueEmailUsernameQuery) {}

  async followUser(
    animeFanID: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
  ): Promise<ReturnMessage> {
    const animeFan = await this.userModel.findById(animeFanID);
    const user = await this.userModel.findById(userID);
    this.followUnfollowUsers(animeFan, user);
    await user.save();
    await animeFan.save();
    return {
      message: 'anime-fan.success.follow',
      statusCode: 200,
    };
  }

  followUnfollowUsers(animeFan: User, user: User) {
    if (user.following.indexOf(animeFan._id) !== -1) {
      user.following.splice(user.following.indexOf(animeFan._id), 1);
      animeFan.followers.splice(animeFan.followers.indexOf(user._id), 1);
    } else {
      user.following.push(animeFan._id);
      animeFan.followers.push(user._id);
    }
  }
}

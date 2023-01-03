import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ReturnMessage } from 'src/shared/interfaces/general/return-message.interface';
import { checkNullability } from 'src/shared/util/check-nullability.util';
import { User, UserDocument } from '../user/entities/user.entity';
import { SearchUsersQueryDto } from './dto/search-users-query.dto';
import { UniqueEmailUsernameQuery } from './dto/unique-email-username.query';

@Injectable()
export class AnimeFanService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  uniqueProperty(query: UniqueEmailUsernameQuery) {}

  findAll(query: SearchUsersQueryDto) {
    const { username, skip, limit } = query;

    const usernameSearch = checkNullability(username)
      ? { username: { $regex: username, $options: 'i' } }
      : {};

    return this.userModel
      .find(usernameSearch)
      .skip(skip || 0)
      .limit(limit || 5)
      .sort({ _id: -1 })
      .exec();
  }

  async findOne(animeFanID: mongoose.Schema.Types.ObjectId) {
    const animeFan = await this.userModel
      .findById(animeFanID)
      .populate('posts')
      .populate('likedPosts')
      .populate('following')
      .populate('followers')
      .populate('comments');
    const cleanAnimeFan = { ...animeFan };
    delete cleanAnimeFan['password'];
    delete cleanAnimeFan['__v'];
    return cleanAnimeFan;
  }

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

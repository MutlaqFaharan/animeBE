import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { ReturnMessage } from 'src/shared/interfaces/general/return-message.interface';
import { cleanObject } from 'src/shared/util/clean-object.util';
import { currentDate } from 'src/shared/util/date.util';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserDocument, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // * Service Functions
  async findOneByCredentials(userCredentials: string): Promise<User> {
    let user = await this.userModel.findOne({
      $or: [
        {
          email: userCredentials,
        },
        {
          username: userCredentials,
        },
      ],
    });
    if (!user)
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.UNAUTHORIZED,
      );

    cleanObject(user);
    return user;
  }

  async findOneByToken(token: string): Promise<User> {
    let user = await this.userModel.findOne({ token });
    emptyDocument(user, 'User');
    cleanObject(user);
    return user;
  }

  async findOneByID(userID: mongoose.Schema.Types.ObjectId): Promise<User> {
    const user = await this.userModel
      .findById(userID)
      .populate('posts')
      .populate('likedPosts')
      .populate('following')
      .populate('followers')
      .populate('comments');
    return cleanObject(user);
  }

  async findOneByIDAsDocument(
    userID: mongoose.Schema.Types.ObjectId,
  ): Promise<User> {
    const user = await this.userModel.findById(userID);
    emptyDocument(user, 'user');
    return user;
  }

  async editProfile(
    userID: mongoose.Schema.Types.ObjectId,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ReturnMessage> {
    const user = await this.userModel.findByIdAndUpdate(
      userID,
      updateProfileDto,
    );

    emptyDocument(user, 'User');
    user.updateDate = currentDate;
    user.isNew = false;
    await user.save();
    return {
      message: 'auth.updateProfile',
      statusCode: 200,
      data: cleanObject((user as any)._doc),
    };
  }
}

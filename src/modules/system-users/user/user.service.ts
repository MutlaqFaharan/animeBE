import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import { cleanObject } from 'src/shared/util/clean-object.util';
import { currentDate } from 'src/shared/util/date.util';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserDocument, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // * Service Functions
  async findOneByEmail(email: string): Promise<User> {
    let user = await this.userModel.findOne({ email });
    if (!user)
      throw new HttpException('auth.errors.wrongInfo', HttpStatus.BAD_REQUEST);

    cleanObject(user);
    return user;
  }

  async findOneByToken(token: string): Promise<User> {
    let user = await this.userModel.findOne({ token });
    emptyDocument(user, 'User');
    cleanObject(user);
    return user;
  }

  async findOneByIDForFrontend(
    userID: mongoose.Schema.Types.ObjectId,
  ): Promise<User> {
    const user = await this.userModel.findById(userID);
    let frontEndUser = { ...user }; // to delete properties
    const cleanFrontEndUser = frontEndUser['_doc' as any];
    delete cleanFrontEndUser.password;
    delete cleanFrontEndUser.__v;
    delete cleanFrontEndUser.updateDate;
    delete cleanFrontEndUser.createDate;
    return cleanFrontEndUser;
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

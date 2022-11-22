import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { validID } from 'src/shared/db-error-handling/valid-id.middleware';
import { cleanObject } from 'src/shared/util/clean-object.util';
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

  async findOneByID(userID: mongoose.Schema.Types.ObjectId): Promise<User> {
    validID(userID);
    const user = await this.userModel.findById(userID);
    emptyDocument(user, 'User');
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/shared/enums/role.enum';
import { UserDocument } from '../user/entities/user.entity';

@Injectable()
export class QAService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  getAllQAs() {
    return this.userModel.find({ role: Role.QA });
  }
}

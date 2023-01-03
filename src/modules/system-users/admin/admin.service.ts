import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/shared/enums/role.enum';
import { QAService } from '../qa/qa.service';
import { UserDocument } from '../user/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly qaService: QAService,
  ) {}

  async getAllAdminsAndQAs() {
    const admins = await this.getAllAdmins();
    const QAs = await this.qaService.getAllQAs();

    return {
      admins,
      QAs,
    };
  }

  getAllAdmins() {
    return this.userModel.find({ role: Role.Admin });
  }
}

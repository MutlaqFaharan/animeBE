import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/modules/system-users/user/entities/user.entity';

/**
 * #### Match if the property exists in the db
 */
@ValidatorConstraint({ name: 'PasswordMatch', async: true })
@Injectable()
export class CustomPasswordMatchValidation
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(value, salt);
    const user = await this.userModel.findOne({ password: hashedPassword });
    if (!user) {
      return false;
    }
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Old Password Is Incorrect';
  }
}

export function PasswordMatch(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomPasswordMatchValidation,
    });
  };
}

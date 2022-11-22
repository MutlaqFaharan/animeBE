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
import { UserDocument } from 'src/modules/system-users/user/entities/user.entity';

/**
 * #### Custom Validator to check if the email exists or not
 */
@ValidatorConstraint({ name: 'UniqueEmail', async: true })
@Injectable()
export class CustomEmailValidation implements ValidatorConstraintInterface {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const user = await this.userModel.findOne({
      email: value?.toLowerCase()?.trim(),
    });
    if (!user) {
      return true;
    }
    return false;
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomEmailValidation,
    });
  };
}
/**
 * ### for student user
 * #### Custom Validator to check if the email exists or not
 */
@ValidatorConstraint({ name: 'ExistEmail', async: true })
@Injectable()
export class CustomExistEmailValidation
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
    const user = await this.userModel.findOne({ email: value });
    if (!user) {
      return false;
    }
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Email does't Exists`;
  }
}

export function ExistEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomExistEmailValidation,
    });
  };
}

/**
 * #### Custom Validator to check if the phone number exists or not
 */
@ValidatorConstraint({ name: 'UniquePhoneNumber', async: true })
@Injectable()
export class CustomPhoneNumberValidation
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
    const user = await this.userModel.findOne({ phoneNumber: value });
    if (!user) {
      return true;
    }
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Phone Number Already Exists';
  }
}

export function UniquePhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomPhoneNumberValidation,
    });
  };
}

/**
 * #### Custom Validator to check if the username exists or not
 */
@ValidatorConstraint({ name: 'UniqueUsername', async: true })
@Injectable()
export class CustomUsernameValidation implements ValidatorConstraintInterface {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const user = await this.userModel.findOne({ username: value });
    if (!user) {
      return true;
    }
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Phone Number Already Exists';
  }
}

export function UniqueUsername(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CustomUsernameValidation,
    });
  };
}

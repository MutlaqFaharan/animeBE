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
      email: value,
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
    return 'validation.uniqueEmail';
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
    const user = await this.userModel.findOne({
      $and: [
        {
          phoneNumber: value,
        },
        {
          phoneNumber: { $ne: null },
        },
      ],
    });
    if (!user) {
      return true;
    }
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'validation.uniquePhoneNumber';
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
  ): Promise<boolean> {
    const user = await this.userModel?.findOne({ username: value });
    if (!user) {
      return true;
    }
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'validation.uniqueUsername';
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

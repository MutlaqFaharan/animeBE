import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

/**
 * #### Custom Validator to check if the email exists or not
 */
@ValidatorConstraint({ name: 'IsUsername', async: true })
@Injectable()
export class IsUsernameValidation implements ValidatorConstraintInterface {
  errorMessage: string;
  constructor() {}
  validate(value: string, validationArguments?: ValidationArguments): boolean {
    //   if()
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is too short or too long!';
  }
}

export function IsUsername(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      name: 'IsUsername',
      options: validationOptions,
      validator: IsUsernameValidation,
    });
  };
}

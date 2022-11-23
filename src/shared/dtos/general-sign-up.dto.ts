import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Transform } from 'class-transformer';
import { Match } from '../decorators/validation/match.decorator';
import {
  UniqueEmail,
  UniquePhoneNumber,
} from '../decorators/validation/unique-property.decorator';

export class GeneralSignUpDto {
  @IsNotEmpty({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.notEmpty.email',
    ),
  })
  @IsEmail(undefined, {
    message: i18nValidationMessage('validation.userSignUpValidation.email'),
  })
  @MinLength(3, {
    message: i18nValidationMessage(
      'validation.userSignUpValidation.length.email',
    ),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  @UniqueEmail({
    message: i18nValidationMessage(
      'auth.signup.animeFan.errors.emailAlreadyExists',
    ),
  })
  email?: string;

  @UniquePhoneNumber({
    message: i18nValidationMessage(
      'auth.signup.animeFan.errors.phoneNumberAlreadyExists',
    ),
  })
  phoneNumber?: string;

  @IsNotEmpty({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.notEmpty.password',
    ),
  })
  password: string;

  @IsNotEmpty({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.notEmpty.confirmPassword',
    ),
  })
  @Match('password', {
    message: 'validation.userSignUpValidation.matchPassword',
  })
  confirmPassword: string;
}

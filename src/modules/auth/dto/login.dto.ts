import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
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
  email: string;

  @Exclude()
  @IsNotEmpty({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.notEmpty.password',
    ),
  })
  password: string;
}

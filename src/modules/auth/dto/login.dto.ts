import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  ValidateIf,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UniqueUsername } from 'src/shared/decorators/validation/unique-property.decorator';
import { checkNullability } from 'src/shared/util/check-nullability.util';

export class LoginDto {
  @ValidateIf((obj: LoginDto) => !checkNullability(obj.username))
  @IsNotEmpty({
    message: i18nValidationMessage(''),
  })
  @IsEmail(undefined, {
    message: i18nValidationMessage(' '),
  })
  @MinLength(3, {
    message: i18nValidationMessage(' '),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  email?: string;

  @IsNotEmpty({
    message: i18nValidationMessage(' '),
  })
  password: string;

  @ValidateIf((obj: LoginDto) => !checkNullability(obj.email))
  @IsNotEmpty({
    message: i18nValidationMessage(''),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(''),
  })
  @IsString({
    message: i18nValidationMessage(' '),
  })
  @UniqueUsername({
    message: i18nValidationMessage(''),
  })
  username?: string;
}

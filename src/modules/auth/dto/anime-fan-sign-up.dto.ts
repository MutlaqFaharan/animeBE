import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, MaxDate } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { animeFanSignupErrorsTranslationPath } from 'src/shared/constants/dto-translation';
import { IsUsername } from 'src/shared/decorators/validation/is-username.decorator';
import { UniqueUsername } from 'src/shared/decorators/validation/unique-property.decorator';
import { GeneralSignUpDto } from 'src/shared/dtos/general-sign-up.dto';
import { thirteenYearsAgo } from 'src/shared/util/date.util';

export class AnimeFanSignUpDto extends GeneralSignUpDto {
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${animeFanSignupErrorsTranslationPath}.notEmpty.username`,
    ),
  })
  @IsString()
  @IsUsername()
  @UniqueUsername({
    message: i18nValidationMessage(
      `${animeFanSignupErrorsTranslationPath}.usernameAlreadyExists`,
    ),
  })
  username: string;

  @IsNotEmpty({
    message: i18nValidationMessage(
      `${animeFanSignupErrorsTranslationPath}.notEmpty.birthday`,
    ),
  })
  @Transform(({ value }) => new Date(value))
  @MaxDate(thirteenYearsAgo, {
    message: i18nValidationMessage(
      `${animeFanSignupErrorsTranslationPath}.minDate`,
    ),
  })
  birthday: string;
}

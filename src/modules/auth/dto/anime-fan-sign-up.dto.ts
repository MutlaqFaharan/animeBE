import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, Length, Matches, MaxDate } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { animeFanSignupErrorsTranslationPath } from 'src/shared/constants/dto-translation';
import { UniqueUsername } from 'src/shared/decorators/validation/unique-property.decorator';
import { GeneralSignUpDto } from 'src/shared/dtos/general-sign-up.dto';
import {
  birthdayStringOptions,
  thirteenYearsAgo,
} from 'src/shared/util/date.util';
import * as moment from 'moment';

export class AnimeFanSignUpDto extends GeneralSignUpDto {
  @IsNotEmpty()
  @Length(3, 30)
  @Matches(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/)
  @UniqueUsername({
    message: i18nValidationMessage(
      `${animeFanSignupErrorsTranslationPath}.usernameAlreadyExists`,
    ),
  })
  username: string;

  @Transform(({ value }) => new Date(value))
  @MaxDate(thirteenYearsAgo, {
    message: i18nValidationMessage(
      `${animeFanSignupErrorsTranslationPath}.minDate`,
    ),
  })
  birthday: string;
}

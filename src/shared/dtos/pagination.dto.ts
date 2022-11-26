import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { sharedErrorsTranslationPath } from '../constants/dto-translation';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, {
    message: i18nValidationMessage(
      `${sharedErrorsTranslationPath}.validation.query.min`,
    ),
  })
  skip: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, {
    message: i18nValidationMessage(
      `${sharedErrorsTranslationPath}.validation.query.min`,
    ),
  })
  limit: number;
}

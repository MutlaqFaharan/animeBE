import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, {
    message: i18nValidationMessage(''),
  })
  skip: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, {
    message: i18nValidationMessage(''),
  })
  limit: number;
}

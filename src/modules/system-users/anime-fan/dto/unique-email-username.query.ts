import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UniqueEmailUsernameQuery {
  @ApiProperty({
    description: 'Choice to check for unique email or username',
    type: 'string',
    required: true,
    examples: ['u', 'e'],
    name: 'choice',
    minLength: 1,
    maxLength: 1,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Choice',
    }),
  })
  @IsIn(['u', 'e'])
  @Transform((param) => param.value.toLowerCase().trim())
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Choice',
    }),
  })
  @MinLength(1, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Choice',
      characters: 1,
    }),
  })
  @MaxLength(1, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Choice',
      characters: 1,
    }),
  })
  choice: string;
}

import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateRoomDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Room',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Room',
    }),
  })
  @MinLength(2, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Room',
      characters: 2,
    }),
  })
  @MaxLength(30, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Room',
      characters: 30,
    }),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  name: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Author',
    }),
  })
  @IsMongoId()
  author: Types.ObjectId;
}

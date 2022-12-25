import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxDate,
  IsEmail,
  MinLength,
  IsUrl,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Match } from 'src/shared/decorators/validation/match.decorator';
import {
  UniqueUsername,
  UniqueEmail,
  UniquePhoneNumber,
} from 'src/shared/decorators/validation/unique-property.decorator';
import { thirteenYearsAgo } from 'src/shared/util/date.util';

export class CreateAnimeFanDto {
  @ApiProperty({
    description: "Anime Fan's username",
    type: 'string',
    required: false,
    example: 'mut1aq',
    name: 'username',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Username',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Username',
    }),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  @UniqueUsername()
  username: string;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @ApiProperty({
    description: "Anime Fan's birthday",
    type: 'date string',
    required: true,
    example: '07/12/2000',
    name: 'birthday',
    minimum: 13,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Birth Day',
    }),
  })
  @Transform(({ value }) => new Date(value))
  @MaxDate(thirteenYearsAgo, {
    message: i18nValidationMessage('validation.maxDate'),
  })
  birthday: string;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @ApiProperty({
    description: "Anime Fan's Profile Picture",
    type: 'url string',
    required: false,
    example: 'https:res.cloudinary.com/picture.png',
    name: 'profilePicture',
  })
  @IsOptional()
  @IsUrl(undefined, {
    message: i18nValidationMessage('validation.isUrl'),
  })
  profilePicture: string;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @ApiProperty({
    description: "Anime Fan's Cover Picture",
    type: 'url string',
    required: false,
    example: 'https:res.cloudinary.com/picture.png',
    name: 'coverPicture',
  })
  @IsOptional()
  @IsUrl(undefined, {
    message: i18nValidationMessage('validation.isUrl'),
  })
  coverPicture: string;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @ApiProperty({
    description: "Anime Fan's Email",
    type: 'string',
    required: true,
    example: 'mutlaqalsadeed@gmail.com',
    name: 'email',
    minLength: 5,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Email',
    }),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  @IsEmail(undefined, {
    message: i18nValidationMessage('validation.email'),
  })
  @UniqueEmail({
    message: i18nValidationMessage('validation.uniqueEmail'),
  })
  @MinLength(5, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Email',
      characters: 5,
    }),
  })
  email: string;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @ApiProperty({
    description: "Anime Fan's Phone Number",
    type: 'string',
    required: false,
    example: '00962795367929',
    name: 'phoneNumber',
  })
  @IsOptional()
  @UniquePhoneNumber()
  @IsPhoneNumber()
  phoneNumber?: string;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @ApiProperty({
    description: "Anime Fan's password when registering",
    example: 'GreaTPassWord123',
    name: 'password',
    required: true,
    minLength: 8,
    maxLength: 20,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  @IsString({
    message: i18nValidationMessage('auth.validation.isString', {
      property: 'Password',
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage('auth.validation.minLength', {
      property: 'Password',
      characters: 8,
    }),
  })
  @MaxLength(20, {
    message: i18nValidationMessage('auth.validation.maxLength', {
      property: 'Password',
      characters: 20,
    }),
  })
  password: string;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @ApiProperty({
    description: "Anime Fan's confirm password when registering",
    example: 'GreaTPassWord123',
    name: 'password',
    required: true,
    minLength: 8,
    maxLength: 20,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  @IsString({
    message: i18nValidationMessage('auth.validation.isString', {
      property: 'Password',
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage('auth.validation.minLength', {
      property: 'Password',
      characters: 8,
    }),
  })
  @MaxLength(20, {
    message: i18nValidationMessage('auth.validation.maxLength', {
      property: 'Password',
      characters: 20,
    }),
  })
  @Match('password')
  confirmPassword: string;
}

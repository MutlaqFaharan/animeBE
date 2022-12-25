import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreatePostDto {
  @ApiProperty({
    description:
      'Test Field for the post, this will be validated if no images or videos were sent in the request',
    type: String,
    example: 'Post about DBZ, it is amazing',
    minLength: 10,
    maxLength: 2200,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage(''),
  })
  @MinLength(10, {
    message: i18nValidationMessage(''),
  })
  @MaxLength(2200, {
    message: i18nValidationMessage(''),
  })
  text: string;

  @ApiProperty({
    description:
      'Images Field for the post, this will be validated if no text or videos were sent in the request',
    type: String,
    example: `{
      images: ['https://anime.com/image1.png', 'https://anime.com/image2.png']
    }`,
    isArray: true,
  })
  @IsOptional()
  @IsArray({
    message: i18nValidationMessage(''),
  })
  @IsUrl(undefined, {
    each: true,
    message: i18nValidationMessage(''),
  })
  images: string[];

  @ApiProperty({
    description:
      'Videos Field for the post, this will be validated if no text or images were sent in the request',
    type: String,
    example: `{
      images: ['https://anime.com/video1.mp4', 'https://anime.com/video2.mp4']
    }`,
    isArray: true,
  })
  @IsOptional()
  // @PostValidation(['text', 'images'])
  @IsArray({
    message: i18nValidationMessage(''),
  })
  @IsUrl(undefined, {
    each: true,
    message: i18nValidationMessage(''),
  })
  videos: string[];
}

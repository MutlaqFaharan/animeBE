import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PostValidation } from 'src/shared/decorators/validation/post.decorator';
import { postErrorsTranslationPath } from 'src/shared/constants/dto-translation';

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
  @PostValidation(['images', 'videos'])
  @IsString({
    message: i18nValidationMessage(
      `${postErrorsTranslationPath}.isString.text`,
    ),
  })
  @MinLength(10, {
    message: i18nValidationMessage(
      `${postErrorsTranslationPath}.minLength.text`,
    ),
  })
  @MaxLength(2200, {
    message: i18nValidationMessage(
      `${postErrorsTranslationPath}.maxLength.text`,
    ),
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
  @PostValidation(['text', 'videos'])
  @IsArray({
    message: i18nValidationMessage(
      `${postErrorsTranslationPath}.isArray.images`,
    ),
  })
  @IsUrl(undefined, {
    each: true,
    message: i18nValidationMessage(`${postErrorsTranslationPath}.isURL.images`),
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
  @PostValidation(['text', 'images'])
  @IsArray({
    message: i18nValidationMessage(
      `${postErrorsTranslationPath}.isArray.videos`,
    ),
  })
  @IsUrl(undefined, {
    each: true,
    message: i18nValidationMessage(`${postErrorsTranslationPath}.isURL.videos`),
  })
  videos: string[];
}

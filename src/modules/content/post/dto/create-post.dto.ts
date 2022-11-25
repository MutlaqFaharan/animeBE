import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PostValidation } from 'src/shared/decorators/validation/post.decorator';

export class CreatePostDto {
  @ApiProperty({
    description:
      'Test Field for the post, this will be validated if no images or videos were sent in the request',
    type: String,
    example: 'Post about DBZ, it is amazing',
    minLength: 10,
    maxLength: 2200,
  })
  @PostValidation({
    message: i18nValidationMessage(''),
  })
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
  @IsArray({ each: true })
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
  @IsArray({ each: true })
  videos: string[];
}

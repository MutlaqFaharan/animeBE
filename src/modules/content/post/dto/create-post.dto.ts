import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Image, Video } from '../../../../shared/interfaces/media.interface';

export class CreatePostDto {
  @ValidateIf((obj) => (!obj.images && !obj.videos) || obj.text)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MaxLength(2200, {
    message: 'Exceeded limit of 2200 Characters',
  })
  text: string;

  @ApiProperty()
  @ValidateIf((obj) => (!obj.text && !obj.videos) || obj.images)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  images: Image[] | Image;

  @ApiProperty()
  @ValidateIf((obj) => (!obj.images && !obj.text) || obj.videos)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  videos: Video[] | Video;
}

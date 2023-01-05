import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(2200, {
    message: 'Exceeded limit of 2200 Characters',
  })
  text: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  replyTo?: Types.ObjectId; // replied-to Comment
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import mongoose, { NullExpression } from 'mongoose';

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
  replayTo?: mongoose.Schema.Types.ObjectId | NullExpression; // replied-to Comment
}

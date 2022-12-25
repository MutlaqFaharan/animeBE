import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

export class SearchUsersQueryDto extends PaginationDto {
  @ApiProperty({
    description: "Anime Fan's username",
    type: 'string',
    required: false,
    example: 'mut1aq',
    name: 'username',
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Username',
    }),
  })
  username: string;
}

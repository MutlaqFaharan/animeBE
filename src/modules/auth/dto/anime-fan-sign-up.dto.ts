import { IsNotEmpty, Length, Matches } from 'class-validator';
import { UniqueUsername } from 'src/shared/decorators/validation/unique-property.decorator';
import { GeneralSignUpDto } from 'src/shared/dtos/general-sign-up.dto';

export class AnimeFanSignUpDto extends GeneralSignUpDto {
  @IsNotEmpty()
  @Length(3, 30)
  @Matches(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/)
  username: string;

  // TODO: determine validation
  birthday: string;
}

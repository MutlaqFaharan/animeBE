import { IsNotEmpty, IsString } from 'class-validator';

export class UniqueEmailUsernameQuery {
  @IsNotEmpty()
  @IsString()
  choice: string;
}

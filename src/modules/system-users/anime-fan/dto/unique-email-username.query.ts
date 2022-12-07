import { IsNotEmpty, IsNumber } from 'class-validator';

export class UniqueEmailUsernameQuery {
  @IsNotEmpty()
  @IsNumber()
  choice: string;
}

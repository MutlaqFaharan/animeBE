import { PartialType } from '@nestjs/mapped-types';
import { AnimeFanSignUpDto } from 'src/modules/auth/dto/anime-fan-sign-up.dto';

export class UpdateProfileDto extends PartialType(AnimeFanSignUpDto) {}

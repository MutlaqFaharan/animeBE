import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimeFanDto } from '../../anime-fan/dto/create-anime-fan.dto';

export class UpdateProfileDto extends PartialType(CreateAnimeFanDto) {}

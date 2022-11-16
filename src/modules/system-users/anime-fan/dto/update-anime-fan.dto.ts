import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimeFanDto } from './create-anime-fan.dto';

export class UpdateAnimeFanDto extends PartialType(CreateAnimeFanDto) {}

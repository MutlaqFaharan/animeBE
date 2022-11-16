import { Injectable } from '@nestjs/common';
import { CreateAnimeFanDto } from './dto/create-anime-fan.dto';
import { UpdateAnimeFanDto } from './dto/update-anime-fan.dto';

@Injectable()
export class AnimeFanService {
  create(createAnimeFanDto: CreateAnimeFanDto) {
    return 'This action adds a new animeFan';
  }

  findAll() {
    return `This action returns all animeFan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animeFan`;
  }

  update(id: number, updateAnimeFanDto: UpdateAnimeFanDto) {
    return `This action updates a #${id} animeFan`;
  }

  remove(id: number) {
    return `This action removes a #${id} animeFan`;
  }
}

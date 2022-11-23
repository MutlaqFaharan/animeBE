import { Injectable } from '@nestjs/common';
import { UniqueEmailUsernameQuery } from './dto/unique-email-username.query';

@Injectable()
export class AnimeFanService {
  constructor() {}

  uniqueProperty(query: UniqueEmailUsernameQuery) {}
}

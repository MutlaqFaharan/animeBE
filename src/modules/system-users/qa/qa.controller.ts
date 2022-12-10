import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QAService } from './qa.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('QA')
@Controller('qa')
export class QAController {
  constructor(private readonly qaService: QAService) {}
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QaService } from './qa.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('QA')
@Controller('qa')
export class QaController {
  constructor(private readonly qaService: QaService) {}
}

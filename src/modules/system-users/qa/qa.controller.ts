import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('QA')
@Controller('qa')
export class QAController {}

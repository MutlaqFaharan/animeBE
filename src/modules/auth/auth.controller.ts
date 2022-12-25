import {
  Controller,
  Post,
  Body,
  Request,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/shared/decorators/public.decorator';
import { CreateAnimeFanDto } from '../system-users/anime-fan/dto/create-anime-fan.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() createAnimeFanDto: CreateAnimeFanDto, @Req() req) {
    return this.authService.signUp(createAnimeFanDto, req);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoginDto) {
    return this.authService.login(req);
  }
}

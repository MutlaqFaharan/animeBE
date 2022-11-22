import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { AnimeFanSignUpDto } from './dto/anime-fan-sign-up.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() animeFanSignUpDto: AnimeFanSignUpDto, @Request() req) {
    return this.authService.signUp(animeFanSignUpDto, req);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoginDto) {
    return this.authService.login(req);
  }
}

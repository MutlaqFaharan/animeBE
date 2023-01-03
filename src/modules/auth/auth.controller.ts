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
import { ReturnMessage } from 'src/shared/interfaces/general/return-message.interface';
import { CreateAnimeFanDto } from '../system-users/anime-fan/dto/create-anime-fan.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() createAnimeFanDto: CreateAnimeFanDto) {
    return this.authService.signUp(createAnimeFanDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: LoginDto) {
    return this.authService.login(req);
  }

  @Post('logout')
  logout(@Req() req): ReturnMessage {
    req.headers.authorization?.split('Bearer ')?.[1];
    // TODO: Redis logout
    return {
      message: 'auth.success.logout',
      statusCode: 200,
    };
  }
}

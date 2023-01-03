import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/modules/system-users/user/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(userCredentials: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(userCredentials, password);
    if (!user) {
      throw new HttpException(
        'auth.errors.unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}

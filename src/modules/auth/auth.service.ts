import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../system-users/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../system-users/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AnimeFanSignUpDto } from './dto/anime-fan-sign-up.dto';
import { Role } from 'src/shared/enums/role.enum';
import { language } from 'src/shared/util/language.util';

@Injectable()
export class AuthService {
  constructor(
    // * Models
    @InjectModel('User') private userModel: Model<UserDocument>,
    // * Services
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userService.findOneByEmail(email);
    if (!user)
      throw new HttpException('auth.errors.wrongInfo', HttpStatus.BAD_REQUEST);
    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('auth.errors.wrongInfo', HttpStatus.BAD_REQUEST);
  }
  async login(req: any): Promise<{ token: string }> {
    const { user } = req;
    delete user['password'];
    const payload = user;
    const token = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });
    return { token };
  }

  async signUp(animeFanSignUpDto: AnimeFanSignUpDto, req: any) {
    const animeFan = new this.userModel(animeFanSignUpDto);
    const salt = await bcrypt.genSalt();
    animeFan.password = await bcrypt.hash(animeFan.password, salt);
    animeFan.role = Role.AnimeFan;
    const lang = language(req);
    //    await this.mailService.animeEmail(animeFan, lang, Emails.Welcome);
    await animeFan.save();
    return { message: 'auth.signup.animeFan', statusCode: 201 };
  }
}

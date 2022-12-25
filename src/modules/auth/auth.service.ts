import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../system-users/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../system-users/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/shared/enums/role.enum';
import { CreateAnimeFanDto } from '../system-users/anime-fan/dto/create-anime-fan.dto';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    // * Models
    @InjectModel('User') private userModel: Model<UserDocument>,
    // * Services
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(userCredentials: string, password: string): Promise<any> {
    const user: User = await this.userService.findOneByCredentials(
      userCredentials,
    );
    if (!user)
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.BAD_REQUEST,
      );
    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('auth.errors.wrongInfo', HttpStatus.BAD_REQUEST);
  }
  async login(req: any): Promise<{ token: string }> {
    const userID = req?.user?._doc?._id;
    const user = await this.userModel.findById(userID);

    const payload: TokenPayload = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });
    return { token };
  }

  async signUp(createAnimeFanDto: CreateAnimeFanDto, req: any) {
    const animeFan = new this.userModel(createAnimeFanDto);
    const salt = await bcrypt.genSalt();

    animeFan.password = await bcrypt.hash(animeFan.password, salt);
    animeFan.role = Role.AnimeFan;

    await animeFan.save();
    return { message: 'auth.signup.animeFan.success', statusCode: 201 };
  }
}

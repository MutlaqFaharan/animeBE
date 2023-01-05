import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { TokenPayload } from 'src/modules/auth/interfaces/token-payload.interface';
import { User } from 'src/modules/system-users/user/entities/user.entity';
import { UserService } from 'src/modules/system-users/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async findUserForChatSocket(socket: Socket): Promise<User> {
    const decodedToken: TokenPayload = this.jwtService.decode(
      socket?.handshake?.auth?.token,
    ) as TokenPayload;
    const user: User = await this.userService.findOneByIDAsDocument(
      decodedToken._id,
    );
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { Socket } from 'socket.io';
import { TokenPayload } from 'src/modules/auth/interfaces/token-payload.interface';
import { CreateRoomDto } from 'src/modules/room/dto/create-room.dto';
import { RoomService } from 'src/modules/room/room.service';
import { User } from 'src/modules/system-users/user/entities/user.entity';
import { UserService } from 'src/modules/system-users/user/user.service';
import { RoomI } from 'src/shared/interfaces/room.interface';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roomService: RoomService,
  ) {}

  async findUserForChatSocket(socket: Socket): Promise<User> {
    const decodedToken: TokenPayload = this.jwtService.decode(
      socket?.handshake?.auth?.token,
    ) as TokenPayload;
    const user: User = await this.userService.findOneByIDForChatSocket(
      decodedToken._id,
    );
    return user;
  }

  async findRoomsForUser(userID: Types.ObjectId) {
    return this.userService.findOneByIDForChatSocket(userID);
  }

  async createRoomForChatSocket(room: RoomI, userID: Types.ObjectId) {
    const createRoomDto: CreateRoomDto = {
      author: userID,
      name: room.name,
    };
    return this.roomService.create(createRoomDto);
  }
}

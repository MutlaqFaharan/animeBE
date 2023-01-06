import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerLogger } from 'src/services/logger/server-logger';
import { RoomI } from 'src/shared/interfaces/room.interface';
import { checkObjectNullability } from 'src/shared/util/check-nullability.util';
import { ChatService } from '../chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly logger: ServerLogger,
    private readonly configService: ConfigService,
    private readonly chatService: ChatService,
  ) {
    this.logger.log(
      `Socket Is Live, On Port ${this.configService.get('CHAT_PORT')}`,
    );
  }

  onModuleInit() {
    // throw new Error('Method not implemented.');
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    // this.server.emit('message', 'test');
    return 'Hello world!';
  }

  async handleConnection(socket: Socket) {
    try {
      const user = await this.chatService.findUserForChatSocket(socket);
      this.logger.log(
        `User Connected, ${user.username || user.email}`,
        'WEB SOCKET',
      );

      if (!checkObjectNullability(user)) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        const userWithRooms = await this.chatService.findRoomsForUser(user._id);

        // Return only rooms connected to the client
        return this.server.to(socket.id).emit('rooms', userWithRooms.rooms);
      }
    } catch {
      return this.disconnect(socket);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  async handleDisconnect(socket: Socket) {
    this.logger.log('User Disconnected', 'WEB SOCKET');
    socket.disconnect();
  }

  afterInit(server: any) {}

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: RoomI) {
    return this.chatService.createRoomForChatSocket(room, socket.data.user._id);
  }
}

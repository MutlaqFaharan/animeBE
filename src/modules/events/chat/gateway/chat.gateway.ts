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

  webSocketLog: string = `Socket Is Live, On Port ${this.configService.get(
    'CHAT_PORT',
  )}`;

  constructor(
    private readonly logger: ServerLogger,
    private readonly configService: ConfigService,
    private readonly chatService: ChatService,
  ) {}

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
    this.logger.log('User Connected, ' + this.webSocketLog, 'WEB SOCKET');
    try {
      const user = await this.chatService.findUserForChatSocket(socket);

      if (checkObjectNullability(user)) {
        this.disconnect(socket);
      } else {
        this.server.emit('message', user);
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
  }

  afterInit(server: any) {
    this.logger.log(this.webSocketLog, 'WEB SOCKET');
  }
}

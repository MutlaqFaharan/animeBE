import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { UserService } from '../system-users/user/user.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    private readonly userService: UserService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const { author } = createRoomDto;
    const room = new this.roomModel(createRoomDto);
    const user = await this.userService.findOneByIDAsDocument(author);
    user.rooms.push(room._id);

    await user.save();
    return room.save();
  }

  async findAll(query: PaginationDto) {
    const { skip, limit } = query;
    const rooms = await this.roomModel
      .find()
      .where({ isDeleted: false })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .populate('users')
      .populate('author')
      .exec();
    return rooms;
  }

  findOne(roomID: Types.ObjectId) {
    return this.roomModel.findById(roomID).populate('users').populate('author');
  }

  update(roomID: Types.ObjectId, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${roomID} room`;
  }

  remove(roomID: Types.ObjectId) {
    return `This action removes a #${roomID} room`;
  }
}

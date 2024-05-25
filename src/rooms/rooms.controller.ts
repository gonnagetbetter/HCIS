import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }
  @Get()
  findAll() {
    return this.roomService.findAll({});
  }
  @Get(':id')
  findOne(@Body('id') id: number) {
    return this.roomService.FindOneSafe(id);
  }
  @Delete(':id')
  remove(@Body('id') id: number) {
    return this.roomService.removeRoom(id);
  }
}

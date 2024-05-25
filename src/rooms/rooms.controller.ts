import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { FindHotelArgs } from '../hotels/args/find-hotel.args';
import { FindRoomArgs } from './args/find-room.args';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }
  @Get()
  findAll(@Query() args: FindRoomArgs) {
    return this.roomService.findAll(args);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.FindOneSafe(id);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.removeRoom(id);
  }
}

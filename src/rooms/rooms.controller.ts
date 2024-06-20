import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { FindRoomArgs } from './args/find-room.args';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserMeta } from '../auth/types/user-meta.type'
import { Meta } from '../auth/decorators/meta.decorator';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRoomDto: CreateRoomDto, @Meta() metaData: UserMeta) {
    return this.roomService.createRoom(createRoomDto, metaData);
  }
  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() args: FindRoomArgs) {
    return this.roomService.findAll(args);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.FindOneSafe(id);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Meta() metaData: UserMeta ) {
    return this.roomService.removeRoom(id, metaData);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Meta } from '../auth/decorators/meta.decorator';
import { UserMeta } from '../auth/types/user-meta.type';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createHotelDto: CreateHotelDto, @Meta() metaData: UserMeta) {
    return this.hotelsService.createHotel(createHotelDto, metaData);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Meta() metaData: UserMeta) {
    return this.hotelsService.findAll(metaData);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @Meta() metaData: UserMeta) {
    return this.hotelsService.FindOneSafe(id, metaData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Meta() metaData: UserMeta) {
    return this.hotelsService.removeHotel(id, metaData);
  }
}

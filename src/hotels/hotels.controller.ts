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
import { RequiredRole } from '../auth/decorators/roles.decorator';
import { Roles } from '../users/enums/roles.enum';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @RequiredRole(Roles.ORGANIZATION)
  create(@Body() createHotelDto: CreateHotelDto, @Meta() metaData: UserMeta) {
    return this.hotelsService.createHotel(createHotelDto, metaData);
  }

  @Get()
  @UseGuards(AuthGuard)
  @RequiredRole(Roles.ORGANIZATION)
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
  @RequiredRole(Roles.ORGANIZATION)
  remove(@Param('id', ParseIntPipe) id: number, @Meta() metaData: UserMeta) {
    return this.hotelsService.removeHotel(id, metaData);
  }
}

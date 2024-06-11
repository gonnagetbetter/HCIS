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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindRoomArgs } from '../rooms/args/find-room.args';
import { Booking } from './entities/booking.enity';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Booking has been successfully created.',
    type: Booking,
  })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns all bookings.',
    type: Booking,
    isArray: true,
  })
  findAll(@Query() args: FindRoomArgs) {
    return this.bookingService.findAll(args);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns a booking by id.',
    type: Booking,
  })
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.FindOneSafe(id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Booking has been successfully removed.',
    type: Booking,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.delete(id);
  }
}

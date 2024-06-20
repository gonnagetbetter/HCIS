import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindRoomArgs } from '../rooms/args/find-room.args';
import { Booking } from './entities/booking.enity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Meta } from '../auth/decorators/meta.decorator';
import { UserMeta } from '../auth/types/user-meta.type';
import { Roles } from '../users/enums/roles.enum';
import { RequiredRole } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('booking')
@Controller('booking')
@UseGuards(AuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Booking has been successfully created.',
    type: Booking,
  })
  @UseGuards(RolesGuard)
  @RequiredRole(Roles.CUSTOMER)
  create(@Body() createBookingDto: CreateBookingDto, @Meta() meta: UserMeta) {
    createBookingDto.customerId = meta.id;
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

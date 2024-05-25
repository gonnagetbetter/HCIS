import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Booking } from './entities/booking.enity';

@Module({
  imports: [MikroOrmModule.forFeature([Booking])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}

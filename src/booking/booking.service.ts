import { Injectable } from '@nestjs/common';
import { BasicCrudService } from '../common/basic-crud.service';
import { Booking } from './entities/booking.enity';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { BookingRepository } from './repositories/booking.repository';
import { CacheService } from '../cache/cache.service';
import { CustomersService } from '../customers/customers.service';
import { RoomsService } from '../rooms/rooms.service';
import { HotelsService } from '../hotels/hotels.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindBookingArgs } from './args/find-booking.args';

@Injectable()
export class BookingService extends BasicCrudService<Booking> {
  constructor(
    protected readonly bookingRepository: BookingRepository,
    protected readonly cacheService: CacheService,
    protected readonly entityManager: EntityManager,
    protected readonly roomsService: RoomsService,
    protected readonly customersService: CustomersService,
    protected readonly hotelsService: HotelsService,
  ) {
    super(Booking, bookingRepository, cacheService, entityManager);
  }

  async create(dto: CreateBookingDto) {
    const { checkIn, checkOut, hotelId, roomId, customerId } = dto;

    const checks: Promise<unknown>[] = [
      this.roomsService.findOneOrFail({ id: roomId }),
      this.hotelsService.findOneOrFail({ id: hotelId }),
      this.customersService.findOneOrFail({ id: customerId }),
    ];

    const [room, hotel, customer] = await Promise.all(checks);

    return this.createOne({ checkIn, checkOut, hotel, room, customer });
  }

  async findAll(args: FindBookingArgs) {
    const filter: FilterQuery<Booking> = {};

    if (args.hotelId) {
      filter.hotel = { id: args.hotelId };
    }

    if (args.roomId) {
      filter.room = { id: args.roomId };
    }

    if (args.customerId) {
      filter.customer = { id: args.customerId };
    }

    return this.findMany(filter);
  }

  async FindOneSafe(id: number) {
    const filter: FilterQuery<Booking> = { id };
    return this.findOneOrFail(filter);
  }

  async delete(id: number) {
    const filter: FilterQuery<Booking> = { id };
    await this.deleteOne(filter);
  }
}

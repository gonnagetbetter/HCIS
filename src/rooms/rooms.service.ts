import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { RoomRepository } from './repositories/room.repository';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { HotelsService } from '../hotels/hotels.service';
import { BookingService } from '../booking/booking.service';
import { BasicCrudService } from '../common/basic-crud.service';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { FindRoomArgs } from './args/find-room.args';

@Injectable()
export class RoomsService extends BasicCrudService<Room> {
  constructor(
    protected readonly roomRepository: RoomRepository,
    protected readonly cacheService: CacheService,
    protected readonly entityManager: EntityManager,
    protected readonly hotelsService: HotelsService,
    protected readonly bookingService: BookingService,
  ) {
    super(Room, roomRepository, cacheService, entityManager);
  }

  async createRoom(dto: CreateRoomDto) {
    const hotel = await this.hotelsService.findOne(dto.hotelId);
    const existing = await this.roomRepository.findOne({
      roomNumber: dto.roomNumber,
      hotel: hotel,
    });
    if (existing) {
      throw new Error('Room already exists');
    }
    return this.createOne(dto);
  }

  async removeRoom(id: number) {
    const filter: FilterQuery<Room> = { id };
    await this.deleteOne(filter);
  }

  async FindOneSafe(id: number) {
    const filter: FilterQuery<Room> = { id };
    return this.findOneOrFail(filter);
  }

  async findAll(args: FindRoomArgs) {
    const filter: FilterQuery<Room> = {};
    if (args.hotelId) {
      filter.hotel = await this.hotelsService.findOne(args.hotelId);
    }
    if (args.bookingId) {
      filter.booking = await this.bookingService.findOne(args.bookingId);
    }
    return this.findMany(filter);
  }
}

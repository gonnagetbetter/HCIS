import { Injectable } from '@nestjs/common';
import { BasicCrudService } from '../common/basic-crud.service';
import { Hotel } from './entities/hotel.entity';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { HotelRepository } from './repositories/hotel.repository';
import { CacheService } from '../cache/cache.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { FindHotelArgs } from './args/find-hotel.args';

@Injectable()
export class HotelsService extends BasicCrudService<Hotel> {
  constructor(
    protected readonly hotelRepository: HotelRepository,
    protected readonly cacheService: CacheService,
    protected readonly entityManager: EntityManager,
    protected readonly organizationService: OrganizationsService,
  ) {
    super(Hotel, hotelRepository, cacheService, entityManager);
  }

  async createHotel(dto: CreateHotelDto) {
    const organization = await this.organizationService.findOne(
      dto.organizationId,
    );
    if (!organization) {
      throw new Error('Organization not found');
    }
    const existing = await this.hotelRepository.findOne({
      name: dto.name,
      organization: organization,
    });
    if (existing) {
      throw new Error('Hotel already exists');
    }
    return this.createOne(dto);
  }

  async removeHotel(id: number) {
    const filter: FilterQuery<Hotel> = { id };
    await this.deleteOne(filter);
  }

  async FindOneSafe(id: number) {
    const filter: FilterQuery<Hotel> = { id };
    return this.findOneOrFail(filter);
  }

  async findAll(args: FindHotelArgs) {
    const filter: FilterQuery<Hotel> = {};
    if (args.oganizationId) {
      filter.organization = await this.organizationService.findOne(
        args.oganizationId,
      );
    }
    return this.findMany(filter);
  }
}

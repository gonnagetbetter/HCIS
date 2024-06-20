import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { BasicCrudService } from '../common/basic-crud.service';
import { Hotel } from './entities/hotel.entity';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { HotelRepository } from './repositories/hotel.repository';
import { CacheService } from '../cache/cache.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Roles } from '../users/enums/roles.enum';
import { UserMeta } from '../auth/types/user-meta.type';

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

  async createHotel(dto: CreateHotelDto, meta: UserMeta) {
    if (meta.role !== Roles.ORGANIZATION) {
      throw new BadGatewayException();
    }

    const organization = await this.organizationService.findOne(meta.id);
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
    return this.createOne({ ...dto, organization });
  }

  async removeHotel(id: number, meta) {
    if (meta.role !== Roles.ORGANIZATION) {
      throw new BadGatewayException();
    }

    const filter: FilterQuery<Hotel> = { id };
    const hotel = await this.findOneOrFail(filter);
    const organization = await this.organizationService.findOneOrFail(meta.id);
    if (hotel.organization === organization) {
      return await this.deleteOne(filter);
    } else throw new BadRequestException();
  }

  async FindOneSafe(id: number, meta: UserMeta) {
    if (meta.role !== Roles.ORGANIZATION) {
      throw new BadGatewayException();
    }

    const filter: FilterQuery<Hotel> = { id };
    const hotel = await this.findOneOrFail(filter);
    const organization = await this.organizationService.findOneOrFail(meta.id);
    if (hotel.organization === organization) {
      return hotel;
    } else throw new BadRequestException();
  }

  async findAll(meta: UserMeta) {
    const filter: FilterQuery<Hotel> = {};

    filter.organization = await this.organizationService.findOne(meta.id);

    return this.findMany(filter);
  }
}

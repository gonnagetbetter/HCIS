import { EntityRepository } from '@mikro-orm/postgresql';
import { Hotel } from '../entities/hotel.entity';

export class HotelRepository extends EntityRepository<Hotel> {}

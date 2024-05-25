import { EntityRepository } from '@mikro-orm/postgresql';
import { Booking } from '../entities/booking.enity';

export class BookingRepository extends EntityRepository<Booking> {}

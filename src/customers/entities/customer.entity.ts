import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerRepository } from '../repositories/customer.repository';
import { Booking } from '../../booking/entities/booking.enity';
import { BasicEntity } from '../../common/basic-entity';

@Entity({ repository: () => CustomerRepository })
export class Customer extends BasicEntity {
  @PrimaryKey({ autoincrement: true })
  @ApiProperty()
  id: number;

  @Property()
  name: string;

  @Property()
  @ApiProperty()
  email: string;

  @ManyToOne(() => Booking, { nullable: false })
  booking: Booking;
}

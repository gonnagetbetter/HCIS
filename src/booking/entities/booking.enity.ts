import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';
import { BookingRepository } from '../repositories/booking.repository';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Room } from '../../rooms/entities/room.entity';
import { BasicEntity } from '../../common/basic-entity';

@Entity({ tableName: 'bookings', repository: () => BookingRepository })
export class Booking extends BasicEntity {
  @PrimaryKey({ autoincrement: true })
  @ApiProperty()
  id: number;

  @Property()
  @ApiProperty()
  checkIn: Date;

  @Property()
  @ApiProperty()
  checkOut: Date;

  @OneToOne(() => Hotel, { nullable: false, unique: true })
  hotel: Hotel;

  @OneToMany(() => Room, (room) => room.booking)
  room = new Collection<Room>(this);

  @OneToMany(() => Customer, (customer) => customer.booking)
  customer = new Collection<Customer>(this);
}

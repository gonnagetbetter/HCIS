import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';
import { HotelRepository } from '../repositories/hotel.repository';
import { Organization } from '../../organizations/entities/organization.entity';
import { Booking } from '../../booking/entities/booking.enity';
import { Room } from '../../rooms/entities/room.entity';

@Entity({ repository: () => HotelRepository })
export class Hotel {
  @PrimaryKey({ autoincrement: true })
  @ApiProperty()
  id: number;

  @Property()
  @ApiProperty()
  name: string;

  @ManyToOne(() => Organization, { nullable: false })
  organization: Organization;

  @OneToOne(() => Booking, { nullable: false, unique: true })
  booking: Booking;

  @OneToMany(() => Room, (room) => room.hotel)
  room = new Collection<Room>(this);
}

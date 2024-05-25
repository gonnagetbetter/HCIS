import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';
import { RoomRepository } from '../repositories/room.repository';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { Booking } from '../../booking/entities/booking.enity';
import { BasicEntity } from '../../common/basic-entity';

@Entity({ tableName: 'rooms', repository: () => RoomRepository })
export class Room extends BasicEntity {
  @PrimaryKey({ autoincrement: true })
  @ApiProperty()
  id: number;

  @Property({ nullable: false })
  @ApiProperty()
  roomNumber: number;

  @Property({ nullable: false })
  @ApiProperty()
  pricePerNight: number;

  @ManyToOne(() => Hotel)
  hotel?: Hotel;

  @ManyToOne(() => Booking, { nullable: false })
  booking: Booking;
}

import { EntityRepository } from '@mikro-orm/postgresql';
import { Room } from '../entities/room.entity';

export class RoomRepository extends EntityRepository<Room> {}

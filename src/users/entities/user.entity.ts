import { ApiProperty } from '@nestjs/swagger';
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/postgresql';

import { BasicEntity } from '../../common/basic-entity';
import { UsersRepository } from '../repositories/users.repository';
import { Roles } from '../enums/roles.enum';

@Entity({ tableName: 'users', repository: () => UsersRepository })
export class User extends BasicEntity {
  @PrimaryKey({ autoincrement: true })
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Property({ nullable: false, unique: true })
  username: string;

  passwordHash: string;

  @Enum(Object.values(Roles))
  @ApiProperty({ enum: Roles })
  role: Roles = Roles.CUSTOMER;

  @Property({ nullable: false })
  @ApiProperty()
  createdAt: Date = new Date();

  @Property({ nullable: false, onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date();
}

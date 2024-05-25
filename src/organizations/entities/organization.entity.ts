import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';
import { OrganizationRole } from '../enums/organization-role.enum';
import { OrganizationRepository } from '../repositories/organization.repository';
import { BasicEntity } from '../../common/basic-entity';

@Entity({ repository: () => OrganizationRepository })
export class Organization extends BasicEntity {
  @PrimaryKey({ autoincrement: true })
  @ApiProperty()
  id: number;

  @Property({ unique: true })
  @ApiProperty()
  name: string;

  @Enum(() => OrganizationRole)
  @ApiProperty({
    enum: OrganizationRole,
  })
  role: OrganizationRole;

  @Property({ hidden: true })
  passwordHash: string;

  @Property({ hidden: true })
  passwordSalt: string;
}

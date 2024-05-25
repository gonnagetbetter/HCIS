import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Organization } from './entities/organization.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Organization])],
  providers: [OrganizationsService],
  controllers: [OrganizationsController],
})
export class OrganizationsModule {}

import { Injectable } from '@nestjs/common';
import { BasicCrudService } from '../common/basic-crud.service';
import { Organization } from './entities/organization.entity';
import { CacheService } from '../cache/cache.service';
import { EntityManager } from '@mikro-orm/core';
import { OrganizationRepository } from './repositories/organization.repository';

@Injectable()
export class OrganizationsService extends BasicCrudService<Organization> {
  constructor(
    protected readonly organizationsRepository: OrganizationRepository,
    protected readonly cacheService: CacheService,
    protected readonly entityManager: EntityManager,
  ) {
    super(Organization, organizationsRepository, cacheService, entityManager);
  }
}

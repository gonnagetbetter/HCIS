import { Injectable } from '@nestjs/common';
import { BasicCrudService } from '../common/basic-crud.service';
import { Customer } from './entities/customer.entity';
import { CacheService } from '../cache/cache.service';
import { EntityManager } from '@mikro-orm/core';
import { CustomerRepository } from './repositories/customer.repository';

@Injectable()
export class CustomersService extends BasicCrudService<Customer> {
  constructor(
    protected readonly customersRepository: CustomerRepository,
    protected readonly cacheService: CacheService,
    protected readonly entityManager: EntityManager,
  ) {
    super(Customer, customersRepository, cacheService, entityManager);
  }
}

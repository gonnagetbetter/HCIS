import { Injectable } from '@nestjs/common';
import { BasicCrudService } from '../common/basic-crud.service';
import { User } from './entities/user.entity';
import { CacheService } from '../cache/cache.service';
import { EntityManager } from '@mikro-orm/core';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService extends BasicCrudService<User> {
  constructor(
    protected readonly usersRepository: UsersRepository,
    protected readonly cacheService: CacheService,
    protected readonly entityManager: EntityManager,
  ) {
    super(User, usersRepository, cacheService, entityManager);
  }
}

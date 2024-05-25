import { EntityRepository } from '@mikro-orm/postgresql';
import { Customer } from '../entities/customer.entity';

export class CustomerRepository extends EntityRepository<Customer> {}

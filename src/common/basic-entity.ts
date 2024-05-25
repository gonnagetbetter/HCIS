import { wrap } from '@mikro-orm/core';
import { EntityKey } from '@mikro-orm/core/typings';

export class BasicEntity {
  toSafeEntity(ignoreFields: EntityKey<this>[]): Partial<BasicEntity> {
    return wrap(this).toObject(ignoreFields);
  }
}

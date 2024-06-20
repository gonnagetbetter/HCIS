import { Roles } from '../../users/enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const RequiredRole = (role: Roles) => SetMetadata('requiredRole', role);

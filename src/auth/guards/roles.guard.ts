import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get('requiredRole', context.getHandler());

    if (!role) return true;

    const req = context.switchToHttp().getRequest();
    const meta = req.meta;

    if (meta !== role) throw new BadRequestException(`${role} only`);

    return true;
  }
}

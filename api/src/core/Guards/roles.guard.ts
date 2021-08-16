import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    const allowedRoles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    return allowedRoles.includes(user.type);
  }
}

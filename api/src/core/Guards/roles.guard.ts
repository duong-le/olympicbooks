import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const allowedRoles = this.reflector.getAllAndOverride<number[]>('roles', [context.getHandler(), context.getClass()]);
    return this.authService.validateRole(allowedRoles, request);
  }
}

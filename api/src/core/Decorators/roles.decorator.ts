import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: number[]): any => SetMetadata('roles', roles);

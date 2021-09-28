import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Customer } from '../../entities/customers.entity';

export const UserInfo = createParamDecorator(
  (data, ctx: ExecutionContext): Customer => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

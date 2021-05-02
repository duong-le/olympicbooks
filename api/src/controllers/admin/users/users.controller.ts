import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { User } from '../../../entities/users.entity';
import { UsersService } from '../../../services/users.service';
import { Role } from '../../../shared/Enums/roles.enum';
import { UpdateUserDto } from '../../store/users/users.dto';

@ApiTags('Admin Users')
@ApiBearerAuth()
@Controller('admin/users')
@UseGuards(AuthGuard())
@Roles(Role.ADMIN)
@Crud({
  model: { type: User },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase', 'recoverOneBase']
  }
})
export class AdminUsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateUserDto): Promise<User> {
    return this.service.updateUser(req.parsed.paramsFilter[0].value, dto);
  }
}

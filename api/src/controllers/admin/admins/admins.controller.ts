import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { Admin } from '../../../entities/admins.entity';
import { UserType } from '../../../shared/Enums/users.enum';
import { AdminsService } from './admins.service';

@ApiTags('Admins')
@ApiBearerAuth()
@Controller('admin/admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
@Crud({
  model: { type: Admin },
  routes: {
    only: ['getManyBase', 'getOneBase']
  }
})
export class AdminsController implements CrudController<Admin> {
  constructor(public service: AdminsService) {}
}

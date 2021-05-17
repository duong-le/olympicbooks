import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Admin } from '../../../entities/admins.entity';
import { AdminsService } from './admins.service';

@ApiTags('Admins')
@ApiBearerAuth()
@Controller('admin/admins')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Admin },
  routes: {
    only: ['getManyBase', 'getOneBase']
  }
})
export class AdminsController implements CrudController<Admin> {
  constructor(public service: AdminsService) {}
}

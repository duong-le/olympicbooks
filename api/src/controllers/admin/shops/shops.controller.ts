import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Shop } from '../../../entities/shops.entity';
import { ShopsService } from '../../../services/shops.service';

@ApiTags('Admin Shops')
@ApiBearerAuth()
@Controller('admin/shops')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Shop },
  routes: {
    only: ['getManyBase', 'getOneBase']
  }
})
export class AdminShopsController implements CrudController<Shop> {
  constructor(public service: ShopsService) {}
}

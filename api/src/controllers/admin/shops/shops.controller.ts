import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Shop } from '../../../entities/shops.entity';
import { ShopsService } from '../../../services/shops.service';
import { AdminUpdateShopDto } from './shops.dto';

@ApiTags('Admin Shops')
@ApiBearerAuth()
@Controller('admin/shops')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Shop },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase']
  },
  query: {
    join: {
      sellers: { eager: true }
    }
  },
  dto: { update: AdminUpdateShopDto }
})
export class AdminShopsController implements CrudController<Shop> {
  constructor(public service: ShopsService) {}
}

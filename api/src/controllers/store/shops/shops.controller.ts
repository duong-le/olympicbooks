import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Shop } from '../../../entities/shops.entity';
import { ShopsService } from '../../../services/shops.service';
import { ShopStatus } from '../../../shared/Enums/shops.enum';

@ApiTags('Shops')
@Controller('shops')
@Crud({
  model: { type: Shop },
  routes: {
    only: ['getManyBase', 'getOneBase']
  },
  query: {
    filter: [
      {
        field: 'status',
        operator: '$eq',
        value: ShopStatus.ACTIVE
      }
    ]
  }
})
export class ShopsController implements CrudController<Shop> {
  constructor(public service: ShopsService) {}
}

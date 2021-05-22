import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Shop } from '../../../entities/shops.entity';
import { ShopsService } from '../../../services/shops.service';

@ApiTags('Shops')
@Controller('shops')
@Crud({
  model: { type: Shop },
  routes: {
    only: ['getManyBase', 'getOneBase']
  }
})
export class ShopsController implements CrudController<Shop> {
  constructor(public service: ShopsService) {}
}

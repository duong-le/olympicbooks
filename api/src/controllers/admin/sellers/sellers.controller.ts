import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Seller } from '../../../entities/sellers.entity';
import { SellersService } from '../../../services/sellers.service';

@ApiTags('Admin Sellers')
@ApiBearerAuth()
@Controller('admin/sellers')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Seller },
  routes: {
    only: ['getManyBase', 'getOneBase']
  }
})
export class AdminSellersController implements CrudController<Seller> {
  constructor(public service: SellersService) {}
}

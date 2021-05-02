import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Discount } from '../../../entities/discounts.entity';
import { DiscountsService } from '../../../services/discounts.service';

@ApiTags('Discounts')
@ApiBearerAuth()
@Controller('discounts')
@UseGuards(AuthGuard())
@Crud({ model: { type: Discount } })
export class DiscountsController implements CrudController<Discount> {
  constructor(public service: DiscountsService) {}
}

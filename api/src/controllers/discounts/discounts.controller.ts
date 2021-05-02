import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Discount } from './discounts.entity';
import { DiscountsService } from './discounts.service';

@ApiTags('Discounts')
@ApiBearerAuth()
@Controller('discounts')
@UseGuards(AuthGuard())
@Crud({ model: { type: Discount } })
export class DiscountsController implements CrudController<Discount> {
  constructor(public service: DiscountsService) {}
}

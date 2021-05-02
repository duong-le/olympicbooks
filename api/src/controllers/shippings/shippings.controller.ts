import { BadRequestException, Controller, Get, ParseIntPipe, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';

import { Roles } from '../../core/Decorators/roles.decorator';
import { Role } from '../../shared/Enums/roles.enum';
import { ShippingMethod } from './shipping-methods.entity';
import { Shipping } from './shippings.entity';
import { ShippingsService } from './shippings.service';

@ApiTags('Shippings')
@ApiBearerAuth()
@Controller('shippings')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Shipping },
  routes: {
    only: ['getOneBase', 'getManyBase'],
    getOneBase: { decorators: [Roles(Role.ADMIN)] },
    getManyBase: { decorators: [Roles(Role.ADMIN)] }
  }
})
export class ShippingsController implements CrudController<Shipping> {
  constructor(public service: ShippingsService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/methods')
  getShippingMethods(@Query('transactionValue', ParseIntPipe) transactionValue: number): Promise<ShippingMethod[]> {
    if (!transactionValue) throw new BadRequestException('Transaction value is not valid');
    return this.service.getShippingMethods(transactionValue);
  }
}

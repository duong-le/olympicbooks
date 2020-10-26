import { Controller, UseGuards, UseInterceptors, Get, ParseIntPipe, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { Shipping } from './shippings.entity';
import { ShippingsService } from './shippings.service';
import { ShippingMethod } from './shipping-methods.entity';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';

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

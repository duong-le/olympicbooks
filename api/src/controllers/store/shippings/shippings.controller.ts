import { BadRequestException, Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ShippingMethod } from '../../../entities/shipping-methods.entity';
import { ShippingsService } from '../../../services/shippings.service';

@ApiTags('Shippings')
@ApiBearerAuth()
@Controller('shippings')
@UseGuards(AuthGuard())
export class ShippingsController {
  constructor(public service: ShippingsService) {}

  @Get('/methods')
  getShippingMethods(@Query('transactionValue', ParseIntPipe) transactionValue: number): Promise<ShippingMethod[]> {
    if (!transactionValue) throw new BadRequestException('Transaction value is not valid');
    return this.service.getShippingMethods(transactionValue);
  }
}

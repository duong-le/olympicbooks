import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { ShippingMethod } from '../../../entities/shipping-methods.entity';
import { ShippingsService } from '../../../services/shippings.service';
import { UserType } from '../../../shared/Enums/users.enum';

@ApiTags('Shippings')
@ApiBearerAuth()
@Controller('shippings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.CUSTOMER)
export class ShippingsController {
  constructor(public service: ShippingsService) {}

  @Get('/methods')
  getShippingMethods(): Promise<ShippingMethod[]> {
    return this.service.getShippingMethods();
  }
}

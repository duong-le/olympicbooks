import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@rewiko/crud';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { Customer } from '../../../entities/customers.entity';
import { CustomersService } from '../../../services/customers.service';
import { UserType } from '../../../shared/Enums/users.enum';
import { AdminUpdateCustomerDto } from '../../store/customers/customers.dto';

@ApiTags('Admin Customers')
@ApiBearerAuth()
@Controller('admin/customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
@Crud({
  model: { type: Customer },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase', 'recoverOneBase']
  }
})
export class AdminCustomersController implements CrudController<Customer> {
  constructor(public service: CustomersService) {}

  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: AdminUpdateCustomerDto): Promise<Customer> {
    return this.service.updateCustomer(req.parsed.paramsFilter[0].value, dto);
  }
}

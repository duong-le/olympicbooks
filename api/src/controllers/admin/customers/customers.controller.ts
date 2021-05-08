import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { Customer } from '../../../entities/customers.entity';
import { CustomersService } from '../../../services/customers.service';
import { Role } from '../../../shared/Enums/roles.enum';
import { UpdateCustomerDto } from '../../store/customers/customers.dto';

@ApiTags('Admin Customers')
@ApiBearerAuth()
@Controller('admin/customers')
@UseGuards(AuthGuard())
@Roles(Role.ADMIN)
@Crud({
  model: { type: Customer },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase', 'recoverOneBase']
  }
})
export class AdminCustomersController implements CrudController<Customer> {
  constructor(public service: CustomersService) {}

  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateCustomerDto): Promise<Customer> {
    return this.service.updateCustomer(req.parsed.paramsFilter[0].value, dto);
  }
}

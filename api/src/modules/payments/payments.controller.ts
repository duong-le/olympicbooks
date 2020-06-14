import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Payment } from './payments.entity';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
@UseGuards(AuthGuard())
@Crud({ model: { type: Payment } })
export class PaymentsController implements CrudController<Payment> {
  constructor(public service: PaymentsService) {}
}

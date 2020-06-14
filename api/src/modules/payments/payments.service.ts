import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payments.entity';
import { PaymentRepository } from './payments.repository';

@Injectable()
export class PaymentsService extends TypeOrmCrudService<Payment> {
  constructor(@InjectRepository(PaymentRepository) private paymentRepository: PaymentRepository) {
    super(paymentRepository);
  }
}

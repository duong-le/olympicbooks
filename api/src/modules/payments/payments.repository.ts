import { Repository, EntityRepository } from 'typeorm';
import { Payment } from './payments.entity';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentRepository } from './payments.repository';

@Module({
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([PaymentRepository])],
  providers: [PaymentsService]
})
export class PaymentsModule {}

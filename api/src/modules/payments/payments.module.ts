import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentRepository } from './payments.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([PaymentRepository]), AuthModule],
  providers: [PaymentsService]
})
export class PaymentsModule {}

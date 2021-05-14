import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Publisher } from '../../../entities/publishers.entity';
import { PublishersService } from '../../../services/publishers.service';
import { PublishersController } from './publishers.controller';

@Module({
  controllers: [PublishersController],
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublishersService],
  exports: [PublishersService]
})
export class PublishersModule {}

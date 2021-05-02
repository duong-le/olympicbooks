import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Publisher } from '../../../entities/publishers.entity';
import { PublishersService } from '../../../services/publishers.service';
import { AdminPublishersController } from './publishers.controller';

@Module({
  controllers: [AdminPublishersController],
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublishersService]
})
export class AdminPublishersModule {}

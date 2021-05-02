import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublishersService } from '../../services/publishers.service';
import { PublishersController } from './publishers.controller';
import { Publisher } from './publishers.entity';

@Module({
  controllers: [PublishersController],
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublishersService]
})
export class PublishersModule {}

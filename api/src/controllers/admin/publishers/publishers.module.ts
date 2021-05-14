import { Module } from '@nestjs/common';

import { PublishersModule } from '../../store/publishers/publishers.module';
import { AdminPublishersController } from './publishers.controller';

@Module({
  controllers: [AdminPublishersController],
  imports: [PublishersModule]
})
export class AdminPublishersModule {}

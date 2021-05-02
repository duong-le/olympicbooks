import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './publishers.entity';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

@Module({
  controllers: [PublishersController],
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublishersService]
})
export class PublishersModule {}

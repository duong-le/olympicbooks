import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';
import { PublisherRepository } from './publishers.repository';

@Module({
  controllers: [PublishersController],
  imports: [TypeOrmModule.forFeature([PublisherRepository])],
  providers: [PublishersService]
})
export class PublishersModule {}

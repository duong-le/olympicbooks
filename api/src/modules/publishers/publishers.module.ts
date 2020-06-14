import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';
import { PublisherRepository } from './publishers.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PublishersController],
  imports: [TypeOrmModule.forFeature([PublisherRepository]), AuthModule],
  providers: [PublishersService]
})
export class PublishersModule {}

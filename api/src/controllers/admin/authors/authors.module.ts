import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Author } from '../../../entities/authors.entity';
import { AuthorsService } from '../../../services/authors.service';
import { AdminAuthorsController } from './authors.controller';

@Module({
  controllers: [AdminAuthorsController],
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService]
})
export class AdminAuthorsModule {}

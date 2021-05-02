import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Author } from '../../entities/authors.entity';
import { AuthorsService } from '../../services/authors.service';
import { AuthorsController } from './authors.controller';

@Module({
  controllers: [AuthorsController],
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService]
})
export class AuthorsModule {}

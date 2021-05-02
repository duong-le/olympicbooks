import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorsService } from '../../services/authors.service';
import { AuthorsController } from './authors.controller';
import { Author } from './authors.entity';

@Module({
  controllers: [AuthorsController],
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService]
})
export class AuthorsModule {}

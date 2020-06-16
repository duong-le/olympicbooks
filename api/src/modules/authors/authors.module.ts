import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorRepository } from './authors.repository';

@Module({
  controllers: [AuthorsController],
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  providers: [AuthorsService]
})
export class AuthorsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorRepository } from './authors.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AuthorsController],
  imports: [TypeOrmModule.forFeature([AuthorRepository]), AuthModule],
  providers: [AuthorsService]
})
export class AuthorsModule {}

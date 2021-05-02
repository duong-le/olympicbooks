import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors.entity';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  controllers: [AuthorsController],
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService]
})
export class AuthorsModule {}

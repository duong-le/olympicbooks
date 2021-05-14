import { Module } from '@nestjs/common';

import { AuthorsModule } from '../../store/authors/authors.module';
import { AdminAuthorsController } from './authors.controller';

@Module({
  controllers: [AdminAuthorsController],
  imports: [AuthorsModule]
})
export class AdminAuthorsModule {}

import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { AuthorsService } from 'src/services/authors.service';

import { Author } from '../../../entities/authors.entity';
import { AuthorsController } from '../../store/authors/authors.controller';
import { CreateAuthorDto, UpdateAuthorDto } from './authors.dto';

@ApiTags('Admin Authors')
@ApiBearerAuth()
@Controller('admin/authors')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Author },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'deleteOneBase']
  },
  dto: { create: CreateAuthorDto, update: UpdateAuthorDto }
})
export class AdminAuthorsController extends AuthorsController {
  constructor(public service: AuthorsService) {
    super(service);
  }
}

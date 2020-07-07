import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Author } from './authors.entity';
import { AuthorsService } from './authors.service';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';
import { CreateAuthorDto, UpdateAuthorDto } from './authors.dto';

@ApiTags('Authors')
@Controller('authors')
@Crud({
  model: { type: Author },
  routes: {
    createOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    createManyBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    updateOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] }
  },
  dto: { create: CreateAuthorDto, update: UpdateAuthorDto }
})
export class AuthorsController implements CrudController<Author> {
  constructor(public service: AuthorsService) {}
}

import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Author } from './authors.entity';
import { AuthorsService } from './authors.service';

@ApiTags('Authors')
@ApiBearerAuth()
@Controller('authors')
@UseGuards(AuthGuard())
@Crud({ model: { type: Author } })
export class AuthorsController implements CrudController<Author> {
  constructor(public service: AuthorsService) {}
}

import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Author } from '../../../entities/authors.entity';
import { AuthorsService } from '../../../services/authors.service';

@ApiTags('Authors')
@Controller('authors')
@Crud({
  model: { type: Author },
  routes: {
    only: ['getManyBase', 'getOneBase']
  }
})
export class AuthorsController implements CrudController<Author> {
  constructor(public service: AuthorsService) {}
}

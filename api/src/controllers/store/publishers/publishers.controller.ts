import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Publisher } from '../../../entities/publishers.entity';
import { PublishersService } from '../../../services/publishers.service';

@ApiTags('Publishers')
@Controller('publishers')
@Crud({
  model: { type: Publisher },
  routes: {
    only: ['getManyBase', 'getOneBase']
  }
})
export class PublishersController implements CrudController<Publisher> {
  constructor(public service: PublishersService) {}
}

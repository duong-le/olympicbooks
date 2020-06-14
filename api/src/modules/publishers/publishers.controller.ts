import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Publisher } from './publishers.entity';
import { PublishersService } from './publishers.service';

@ApiTags('Publishers')
@ApiBearerAuth()
@Controller('publishers')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Publisher }
})
export class PublishersController implements CrudController<Publisher> {
  constructor(public service: PublishersService) {}
}

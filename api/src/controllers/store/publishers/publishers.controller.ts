import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { Publisher } from '../../../entities/publishers.entity';
import { PublishersService } from '../../../services/publishers.service';
import { Role } from '../../../shared/Enums/roles.enum';
import { CreatePublisherDto, UpdatePublisherDto } from './publishers.dto';

@ApiTags('Publishers')
@Controller('publishers')
@Crud({
  model: { type: Publisher },
  routes: {
    createOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    updateOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] }
  },
  dto: { create: CreatePublisherDto, update: UpdatePublisherDto }
})
export class PublishersController implements CrudController<Publisher> {
  constructor(public service: PublishersService) {}
}

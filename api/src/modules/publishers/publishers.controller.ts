import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Publisher } from './publishers.entity';
import { PublishersService } from './publishers.service';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';
import { CreatePublisherDto, UpdatePublisherDto } from './publishers.dto';

@ApiTags('Publishers')
@Controller('publishers')
@Crud({
  model: { type: Publisher },
  routes: {
    createOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    createManyBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    updateOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] }
  },
  dto: { create: CreatePublisherDto, update: UpdatePublisherDto }
})
export class PublishersController implements CrudController<Publisher> {
  constructor(public service: PublishersService) {}
}

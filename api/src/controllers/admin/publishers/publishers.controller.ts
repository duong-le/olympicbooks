import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { Publisher } from '../../../entities/publishers.entity';
import { PublishersService } from '../../../services/publishers.service';
import { Role } from '../../../shared/Enums/roles.enum';
import { PublishersController } from '../../store/publishers/publishers.controller';
import { CreatePublisherDto, UpdatePublisherDto } from './publishers.dto';

@ApiTags('Admin Publishers')
@ApiBearerAuth()
@Controller('admin/publishers')
@UseGuards(AuthGuard())
@Roles(Role.ADMIN)
@Crud({
  model: { type: Publisher },
  routes: {
    only: ['createOneBase', 'updateOneBase', 'deleteOneBase']
  },
  dto: { create: CreatePublisherDto, update: UpdatePublisherDto }
})
export class AdminPublishersController extends PublishersController {
  constructor(public service: PublishersService) {
    super(service);
  }
}

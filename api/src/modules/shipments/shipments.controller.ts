import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Shipment } from './shipments.entity';
import { ShipmentsService } from './shipments.service';

@ApiTags('Shipments')
@ApiBearerAuth()
@Controller('shipments')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Shipment }
})
export class ShipmentsController implements CrudController<Shipment> {
  constructor(public service: ShipmentsService) {}
}

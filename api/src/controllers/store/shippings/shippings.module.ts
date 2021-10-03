import { Module } from '@nestjs/common';

import { ShippingsService } from '../../../services/shippings.service';

@Module({
  providers: [ShippingsService],
  exports: [ShippingsService]
})
export class ShippingsModule {}

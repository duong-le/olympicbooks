import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shop } from '../../../entities/shops.entity';
import { CloudStorageService } from '../../../services/cloud-storage.service';
import { ShopsService } from '../../../services/shops.service';
import { ShopsController } from './shops.controller';

@Module({
  controllers: [ShopsController],
  imports: [TypeOrmModule.forFeature([Shop])],
  providers: [ShopsService, CloudStorageService],
  exports: [ShopsService]
})
export class ShopsModule {}

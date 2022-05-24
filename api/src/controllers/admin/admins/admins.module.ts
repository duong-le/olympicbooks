import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from '../../../entities/admins.entity';
import { AdminsController } from './admins.controller';
import { AdminsService } from '../../../services/admins.service';

@Module({
  controllers: [AdminsController],
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminsService]
})
export class AdminsModule {}

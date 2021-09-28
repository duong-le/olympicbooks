import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttributeValue } from '../../../entities/attribute-value.entity';
import { Attribute } from '../../../entities/attribute.entity';
import { AdminAttributesController } from './attributes.controller';

@Module({
  controllers: [AdminAttributesController],
  imports: [TypeOrmModule.forFeature([Attribute, AttributeValue])]
})
export class AdminAttributesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { ShippingMethod } from '../entities/shipping-methods.entity';
import { Shipping } from '../entities/shippings.entity';

@Injectable()
export class ShippingsService extends TypeOrmCrudService<Shipping> {
  constructor(
    @InjectRepository(Shipping) private shippingRepository: Repository<Shipping>,
    @InjectRepository(ShippingMethod) private shippingMethodRepository: Repository<ShippingMethod>
  ) {
    super(shippingRepository);
  }

  async getShippingMethods(): Promise<ShippingMethod[]> {
    return await this.shippingMethodRepository.find({ order: { id: 'ASC' } });
  }
}

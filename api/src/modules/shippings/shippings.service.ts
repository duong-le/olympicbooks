import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Shipping } from './Shippings.entity';
import { ShippingMethod } from './shipping-methods.entity';

@Injectable()
export class ShippingsService extends TypeOrmCrudService<Shipping> {
  constructor(
    @InjectRepository(Shipping) private shippingRepository: Repository<Shipping>,
    @InjectRepository(ShippingMethod) private shippingMethodRepository: Repository<ShippingMethod>
  ) {
    super(shippingRepository);
  }

  async getShippingMethods(): Promise<ShippingMethod[]> {
    return this.shippingMethodRepository.find();
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Shipping } from './shippings.entity';
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
    return await this.shippingMethodRepository.createQueryBuilder('shipping-method').orderBy('id', 'ASC').getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FREE_SHIPPING_ORDER_VALUE_THRESHOLD } from 'src/shared/Constants/transaction.constant';
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

  async getShippingMethods(transactionValue: number): Promise<ShippingMethod[]> {
    let shippingMethods = await this.shippingMethodRepository.createQueryBuilder('shipping-method').orderBy('id', 'ASC').getMany();

    if (transactionValue >= FREE_SHIPPING_ORDER_VALUE_THRESHOLD)
      shippingMethods = shippingMethods.map((method) => {
        method.fee = 0;
        return method;
      });
    return shippingMethods;
  }
}

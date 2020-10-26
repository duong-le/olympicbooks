import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Shipping } from './shippings.entity';
import { ShippingMethod } from './shipping-methods.entity';
import { MIN_FREE_SHIPPING_ORDER_VALUE } from 'src/shared/Constants/transaction.constant';

@Injectable()
export class ShippingsService extends TypeOrmCrudService<Shipping> {
  constructor(
    @InjectRepository(Shipping) private shippingRepository: Repository<Shipping>,
    @InjectRepository(ShippingMethod) private shippingMethodRepository: Repository<ShippingMethod>
  ) {
    super(shippingRepository);
  }

  async getShippingMethods(transactionValue: number): Promise<ShippingMethod[]> {
    let shippingMethods = await this.shippingMethodRepository
      .createQueryBuilder('shipping-method')
      .orderBy('id', 'ASC')
      .getMany();

    if (transactionValue >= MIN_FREE_SHIPPING_ORDER_VALUE)
      shippingMethods = shippingMethods.map((method) => {
        method.fee = 0;
        return method;
      });
    return shippingMethods;
  }
}

import { Injectable } from '@nestjs/common';

const FREE_SHIPPING_ORDER_VALUE_THRESHOLD = 500_000;

@Injectable()
export class ShippingsService {
  isEligibleForFreeShipping(value: number) {
    return value >= FREE_SHIPPING_ORDER_VALUE_THRESHOLD;
  }
}

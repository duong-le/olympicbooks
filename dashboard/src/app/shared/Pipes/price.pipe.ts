import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe extends CurrencyPipe implements PipeTransform {
  transform(value: string | number): any {
    return super.transform(value, 'VND', 'symbol', null, 'vi-VN');
  }
}

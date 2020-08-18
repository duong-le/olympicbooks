import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'price'
})
export class PricePipe extends CurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return super.transform(value, 'VND', 'symbol', null, 'vi-VN');
  }
}

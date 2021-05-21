import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe extends CurrencyPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return super.transform(value, 'VND', 'symbol', '', 'vi-VN');
  }
}

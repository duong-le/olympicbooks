import { Pipe, PipeTransform } from '@angular/core';

import { ProductStatus } from '../Enums/products.enum';

@Pipe({
  name: 'productstatus'
})
export class ProductStatusPipe implements PipeTransform {
  transform(value: string, color = false): string {
    switch (value) {
      case ProductStatus.ACTIVE:
        return color ? 'success' : 'Đang hoạt động';
      case ProductStatus.SOLD_OUT:
        return color ? 'warning' : 'Hết hàng';
      case ProductStatus.UNLISTED:
        return color ? 'default' : 'Đã ẩn';
      case ProductStatus.BANNED:
        return color ? 'error' : 'Đã tạm khóa';
      default:
        return null;
    }
  }
}

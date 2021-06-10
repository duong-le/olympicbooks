import { Pipe, PipeTransform } from '@angular/core';

import { ShopStatus } from '../Enums/shops.enum';

@Pipe({
  name: 'shopstatus'
})
export class ShopStatusPipe implements PipeTransform {
  transform(value: string, color = false): string {
    switch (value) {
      case ShopStatus.ACTIVE:
        return color ? 'success' : 'Đang hoạt động';
      case ShopStatus.UNAPPROVED:
        return color ? 'warning' : 'Đang xét duyệt';
      case ShopStatus.UNLISTED:
        return color ? 'default' : 'Đã ẩn';
      case ShopStatus.BANNED:
        return color ? 'error' : 'Đã tạm khóa';
      default:
        return null;
    }
  }
}

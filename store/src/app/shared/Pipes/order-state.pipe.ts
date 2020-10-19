import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderState'
})
export class OrderStatePipe implements PipeTransform {
  transform(value: string, color = false): string {
    switch (value) {
      case 'PROCESSING':
        return color ? 'processing' : 'Đang xử lý';
      case 'SHIPPING':
        return color ? 'warning' : 'Đang giao hàng';
      case 'DELIVERED':
        return color ? 'success' : 'Đã giao hàng';
      case 'CANCELLED':
        return color ? 'error' : 'Đã huỷ';
      case 'PENDING':
        return color ? 'processing' : 'Đang chờ';
      case 'SUCCESS':
        return color ? 'success' : 'Hoàn tất';
      default:
        return null;
    }
  }
}

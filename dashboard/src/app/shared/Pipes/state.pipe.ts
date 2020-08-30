import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {
  transform(value: string, color = false): string {
    switch (value) {
      case 'PROCESSING':
        return color ? 'processing' : 'Đang xử lý';
      case 'SHIPPING':
        return color ? 'warning' : 'Đang giao hàng';
      case 'DELIVERED':
        return color ? 'success' : 'Đã giao hàng';
      case 'CANCELLED':
        return color ? 'error' : 'Đã huỷ đơn';
      case 'PENDING':
        return 'Đang chờ';
      case 'SUCCESS':
        return 'Hoàn tất';
      case 'CANCELLED':
        return 'Đã huỷ';
      default:
        return null;
    }
  }
}

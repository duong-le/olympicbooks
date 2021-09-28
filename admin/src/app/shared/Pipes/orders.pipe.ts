import { Pipe, PipeTransform } from '@angular/core';
import { ShippingState } from 'src/app/shared/Enums/shippings.enum';
import { TransactionState } from 'src/app/shared/Enums/transactions.enum';

@Pipe({
  name: 'orderstate'
})
export class OrderStatePipe implements PipeTransform {
  transform(value: string, color = false): string {
    switch (value) {
      case ShippingState.PROCESSING:
        return color ? 'processing' : 'Đang xử lý';
      case ShippingState.SHIPPING:
        return color ? 'warning' : 'Đang giao hàng';
      case ShippingState.DELIVERED:
        return color ? 'success' : 'Đã giao hàng';
      case ShippingState.CANCELLED || TransactionState.CANCELLED:
        return color ? 'error' : 'Đã huỷ';
      case TransactionState.PENDING:
        return color ? 'processing' : 'Đang chờ';
      case TransactionState.SUCCESS:
        return color ? 'success' : 'Hoàn tất';
      default:
        return null;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DeliveryState } from 'src/app/shared/Enums/delivery-state.enum';
import { TransactionState } from 'src/app/shared/Enums/transaction-state.enum';

@Pipe({
  name: 'orderState'
})
export class OrderStatePipe implements PipeTransform {
  transform(value: string, color = false): string {
    switch (value) {
      case DeliveryState.PROCESSING:
        return color ? 'processing' : 'Đang xử lý';
      case DeliveryState.SHIPPING:
        return color ? 'warning' : 'Đang giao hàng';
      case DeliveryState.DELIVERED:
        return color ? 'success' : 'Đã giao hàng';
      case DeliveryState.CANCELLED || TransactionState.CANCELLED:
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

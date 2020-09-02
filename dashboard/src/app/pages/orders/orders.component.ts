import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/Base/base.component';
import { OrdersService } from './orders.service';
import { Order } from 'src/app/shared/Interfaces/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent<Order> {
  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Ngày mua', key: 'createdAt', sort: true },
    { title: 'Trạng thái', key: 'state', sort: true },
    { title: 'Sản phẩm' },
    { title: 'Người nhận' },
    { title: 'Phương thức giao hàng', key: 'shipping.shippingMethod.method', sort: true },
    { title: 'Thanh Toán', key: 'transaction.state', sort: true },
    // { title: 'Giảm giá' },
    { title: 'Phí vận chuyển', key: 'shipping.shippingMethod.fee', sort: true },
    { title: 'Tổng tiền', key: 'transaction.value', sort: true }
  ];

  constructor(private ordersService: OrdersService) {
    super(ordersService);
  }
}

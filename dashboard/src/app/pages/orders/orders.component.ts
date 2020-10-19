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
    { title: 'Giao hàng', key: 'shipping.state', sort: true },
    { title: 'Thanh Toán', key: 'transaction.state', sort: true },
    { title: 'Sản phẩm' },
    { title: 'Người nhận' },
    { title: 'Phí vận chuyển', key: 'shipping.shippingMethod.fee', sort: true },
    { title: 'Tổng tiền', key: 'transaction.value', sort: true }
    // { title: 'Giảm giá' }
  ];

  constructor(private ordersService: OrdersService) {
    super(ordersService);
  }
}

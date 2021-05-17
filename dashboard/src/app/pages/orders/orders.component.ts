import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseComponent } from '../../shared/Base/base.component';
import { Order } from '../../shared/Interfaces/order.interface';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent<Order> {
  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Mã vận chuyển', key: 'shipping.code', sort: true },
    { title: 'Ngày mua', key: 'createdAt', sort: true },
    { title: 'Giao hàng', key: 'shipping.state', sort: true },
    { title: 'Thanh Toán', key: 'transaction.state', sort: true },
    { title: 'Phí vận chuyển', key: 'shipping.fee', sort: true },
    { title: 'Tổng tiền', key: 'transaction.value', sort: true }
    // { title: 'Giảm giá' }
  ];

  constructor(
    private ordersService: OrdersService,
    private messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(ordersService, modalService);
  }

  delete(id: number) {
    this.isLoading = true;
    this.ordersService.deleteOne(id).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Xoá thành công!');
        this.renderPage();
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Order } from '../../../shared/Interfaces/order.interface';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  isLoading = false;

  constructor(private titleService: Title, private customerService: CustomerService) {
    this.titleService.setTitle('Quản lý đơn hàng | OlympicBooks');
  }

  ngOnInit(): void {
    this.renderOrdersPage();
  }

  renderOrdersPage(): void {
    this.isLoading = true;
    this.customerService.getManyOrders({ sort: 'id,DESC' }).subscribe((response) => {
      this.orders = response;
      this.isLoading = false;
    });
  }
}

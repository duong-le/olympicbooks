import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Order } from 'src/app/shared/Interfaces/order.interface';
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
    this.titleService.setTitle('Quản lý đơn hàng | Olympicbooks');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.customerService.getOrders({ sort: 'id,ASC' }).subscribe((response) => {
      this.orders = response;
      this.isLoading = false;
    });
  }
}

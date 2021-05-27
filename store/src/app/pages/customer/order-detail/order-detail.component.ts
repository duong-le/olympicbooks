import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ShippingState } from '../../../shared/Enums/shippings.enum';
import { Order } from '../../../shared/Interfaces/order.interface';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss', '../orders/orders.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  subscription$$: Subscription;
  order: Order;
  deliveryState = ShippingState;

  isLoading = false;
  orderId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.subscription$$ = this.activatedRoute.params.subscribe(({ orderId }) => {
      this.orderId = orderId;
      this.renderOrderDetailPage();
    });
  }

  renderOrderDetailPage(): void {
    this.isLoading = true;
    this.customerService.getOneOrder(this.orderId).subscribe(
      (response) => {
        this.order = response;
        this.titleService.setTitle(`Đơn hàng #${response.id} | OlympicBooks`);
        this.isLoading = false;
      },
      (error) => this.router.navigate(['/'])
    );
  }

  ngOnDestroy(): void {
    this.subscription$$.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeliveryState } from 'src/app/shared/Enums/delivery-state.enum';
import { Order } from 'src/app/shared/Interfaces/order.interface';

import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss', '../orders/orders.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  subscription$$: Subscription;
  isLoading = false;
  order: Order;
  deliveryState = DeliveryState;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.subscription$$ = this.activatedRoute.params.subscribe(({ orderId }) => {
      this.render(Number(orderId));
    });
  }
  render(orderId: number) {
    this.isLoading = true;
    this.customerService.getOrderDetail(orderId).subscribe(
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

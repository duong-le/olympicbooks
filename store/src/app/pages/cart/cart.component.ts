import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';

import { Cart } from '../../shared/Interfaces/cart.interface';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart;
  cartSubscription: Subscription;

  isLoading = true;
  isDisabled = false;
  minQty = 1;
  maxQty = 99;

  constructor(
    private titleService: Title,
    private cartService: CartService,
    private messageService: NzMessageService
  ) {
    this.titleService.setTitle('Giỏ hàng | OlympicBooks');
  }

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe((response) => (this.cart = response));
  }

  changeQuantity(id: number, quantity: number) {
    this.isDisabled = true;
    this.cartService.updateCartItem(id, quantity).subscribe(
      (response) => {
        this.cartService.setCart();
        this.isDisabled = false;
        this.messageService.success('Cập nhật số lượng thành công!');
      },
      (error) => {
        this.isDisabled = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }

  deleteCartItem(id: number) {
    this.isDisabled = true;
    this.cartService.deleteCartItem(id).subscribe(
      (response) => {
        this.cartService.setCart();
        this.isDisabled = false;
        this.messageService.success('Xoá khỏi giỏ hàng thành công!');
      },
      (error) => {
        this.isDisabled = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }

  onLoadImage(event: Event) {
    if (event && event.target) this.isLoading = false;
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}

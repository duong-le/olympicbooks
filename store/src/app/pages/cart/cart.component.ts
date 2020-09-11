import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { mergeMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cart } from 'src/app/shared/Interfaces/cart.interface';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart;

  isLoading = true;
  isDisabled = false;
  minQty = 1;
  maxQty = 99;

  constructor(private titleService: Title, private cartService: CartService, private messageService: NzMessageService) {
    this.titleService.setTitle('Giỏ hàng | OlympicBooks');
  }

  ngOnInit() {
    this.cartService.cart$.subscribe((response) => (this.cart = response));
  }

  changeQuantity(id: number, quantity: number) {
    this.isDisabled = true;
    this.cartService
      .updateCartItem(id, quantity)
      .pipe(mergeMap((response) => this.cartService.getCart()))
      .subscribe(
        (response) => {
          this.cartService.setCart(response);
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
    this.cartService
      .deleteCartItem(id)
      .pipe(mergeMap((response) => this.cartService.getCart()))
      .subscribe(
        (response) => {
          this.cartService.setCart(response);
          this.isDisabled = false;
          this.messageService.success('Xoá khỏi giỏ hàng thành công!');
        },
        (error) => {
          this.isDisabled = false;
          this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
      );
  }

  onLoadImage(event) {
    if (event && event.target) this.isLoading = false;
  }
}

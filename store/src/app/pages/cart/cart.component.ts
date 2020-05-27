import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  loading = true;
  minQty = 1;
  maxQty = 10;
  cartItems = [
    {
      name: 'Nhà Giả Kim',
      src: 'https://picsum.photos/seed/123/80',
      quantity: 1,
      price: 112334
    },
    {
      name: 'Lập trình hướng đối tượng dành cho người mới bắt đầu',
      src: 'https://picsum.photos/seed/124/80',
      quantity: 2,
      price: 56000
    },
    {
      name: 'Khi Hơi Thở Hóa Thinh Không',
      src: 'https://picsum.photos/seed/125/80',
      quantity: 3,
      price: 2180000
    }
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle('Giỏ hàng | Olymbooks');
  }

  ngOnInit(): void {}

  onLoadImage(event) {
    if (event && event.target) {
      this.loading = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-empty',
  template: `
    <nz-result nzIcon="shopping-twotone" nzTitle="Không có sản phẩm nào trong giỏ hàng của bạn">
      <div nz-result-extra>
        <a nz-button nzType="primary" routerLink="/">Tiếp tục mua sắm</a>
      </div>
    </nz-result>
  `
})
export class CartEmptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

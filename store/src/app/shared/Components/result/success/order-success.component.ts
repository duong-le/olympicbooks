import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  template: `
    <nz-result nzStatus="success" nzTitle="Đặt hàng thành công">
      <div nz-result-extra>
        <a nz-button nzType="primary" routerLink="/">Quay về trang chủ</a>
        <a nz-button routerLink="/customer/orders">Quản lý đơn hàng</a>
      </div>
    </nz-result>
  `
})
export class OrderSuccessComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

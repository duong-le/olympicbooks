import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-error',
  template: `
    <nz-result
      nzStatus="error"
      nzTitle="Đặt hàng không thành công"
      nzSubTitle="Xin vui lòng tải lại trang và thử lại!"
    >
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/">Quay về trang chủ</button>
      </div>
    </nz-result>
  `
})
export class OrderErrorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

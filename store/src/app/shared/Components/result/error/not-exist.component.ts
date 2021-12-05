import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-exist',
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại">
      <div nz-result-extra>
        <a nz-button nzType="primary" routerLink="/">Về trang chủ</a>
      </div>
    </nz-result>
  `
})
export class NotExistComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Không tìm thấy trang yêu cầu | OlympicBooks');
  }

  ngOnInit(): void {}
}

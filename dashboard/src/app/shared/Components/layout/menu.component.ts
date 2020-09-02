import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-menu]',
  template: `
    <li nz-submenu nzTitle="Thống kê" nzIcon="dashboard" nzOpen></li>
    <li nz-submenu nzTitle="Sản phẩm" nzIcon="book" nzOpen>
      <ul>
        <li nz-menu-item nzMatchRouter><a routerLink="/products">Sách</a></li>
        <li nz-menu-item nzMatchRouter><a routerLink="/categories">Danh mục</a></li>
        <li nz-menu-item nzMatchRouter><a routerLink="/authors">Tác giả</a></li>
        <li nz-menu-item nzMatchRouter><a routerLink="/publishers">Nhà xuất bản</a></li>
      </ul>
    </li>
    <li nz-submenu nzTitle="Đơn hàng" nzIcon="unordered-list" nzOpen>
      <ul>
        <li nz-menu-item nzMatchRouter><a routerLink="/orders">Đơn hàng</a></li>
        <li nz-menu-item nzMatchRouter nzDisabled><a routerLink="/discounts">Khuyến mãi</a></li>
      </ul>
    </li>
    <li nz-submenu nzTitle="Người dùng" nzIcon="user" nzOpen>
      <ul>
        <li nz-menu-item nzMatchRouter><a routerLink="/customers">Người dùng</a></li>
      </ul>
    </li>
  `
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { Order } from '../../shared/Interfaces/order.interface';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  shopId: number;
  orders: Order[];

  isLoading = false;
  pageSize = 10;
  pageIndex = 1;
  total: number;

  queryParams = {
    sort: 'id,DESC',
    page: '1',
    limit: String(this.pageSize)
  };

  columns = [
    { title: '', width: '35px' },
    { title: 'Actions', width: '90px' },
    { title: 'ID' },
    // { title: 'Mã vận chuyển' },
    { title: 'Ngày mua' },
    { title: 'Giao hàng' },
    { title: 'Thanh Toán' },
    { title: 'Phí vận chuyển' },
    { title: 'Tổng tiền' }
    // { title: 'Giảm giá' }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(({ shopId }) => {
      this.shopId = shopId;
      this.renderOrdersTable();
    });
  }

  renderOrdersTable() {
    this.isLoading = true;
    this.ordersService.getMany(this.shopId, this.queryParams).subscribe((response) => {
      this.orders = response['data'].map((order) => ({ ...order, expand: false }));
      this.total = response['total'];
      this.pageIndex = response['page'];
      this.isLoading = false;
    });
  }

  showDetailModal(modalContent: TemplateRef<{}>, item: Order): void {
    this.modalService.create({
      nzTitle: `Chi tiết #${item['id']}`,
      nzContent: modalContent,
      nzWidth: 1000,
      nzMaskClosable: true,
      nzClosable: true,
      nzFooter: null,
      nzComponentParams: item
    });
  }

  changeQueryParams(params: NzTableQueryParams): void {
    this.queryParams.page = String(params.pageIndex);
    this.queryParams.limit = String(params.pageSize);
    this.renderOrdersTable();
  }
}

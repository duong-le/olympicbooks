import { Component, OnInit } from '@angular/core';
import { RequestQueryBuilder, CondOperator } from '@nestjsx/crud-request';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { OrdersService } from './orders.service';
import { Order } from 'src/app/shared/Interfaces/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  qb: RequestQueryBuilder;

  searchInputById: number;
  isLoading = false;
  total: number;
  pageIndex = 1;
  pageSize = 10;

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Ngày mua', key: 'createdAt', sort: true },
    { title: 'Trạng thái', key: 'state', sort: true },
    { title: 'Sản phẩm' },
    { title: 'Người nhận' },
    { title: 'Phương thức giao hàng', key: 'shipping.shippingMethod.method', sort: true },
    { title: 'Thanh Toán', key: 'transaction.state', sort: true },
    // { title: 'Giảm giá' },
    { title: 'Phí vận chuyển', key: 'shipping.shippingMethod.fee', sort: true },
    { title: 'Tổng tiền', key: 'transaction.value', sort: true }
  ];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.qb = RequestQueryBuilder.create().sortBy({ field: 'id', order: 'DESC' }).setPage(this.pageIndex).setLimit(this.pageSize);
    this.renderProducts();
  }

  renderProducts() {
    this.isLoading = true;
    this.ordersService.getManyOrders(this.qb.queryObject).subscribe((response) => {
      this.orders = response.data;
      this.total = response.total;
      this.isLoading = false;
    });
  }

  onSearch() {
    delete this.qb.queryObject.filter;
    this.searchInputById && this.qb.setFilter({ field: 'id', operator: CondOperator.EQUALS, value: this.searchInputById });
    this.renderProducts();
  }

  onTableQueryParamsChange(params: NzTableQueryParams): void {
    this.qb.setPage(params.pageIndex).setLimit(params.pageSize);
    const sort = params.sort.find((item) => item.value !== null);
    delete this.qb.queryObject.sort;
    sort
      ? this.qb.sortBy({ field: sort.key, order: sort.value === 'ascend' ? 'ASC' : 'DESC' })
      : this.qb.sortBy({ field: 'id', order: 'DESC' });
    this.renderProducts();
  }
}

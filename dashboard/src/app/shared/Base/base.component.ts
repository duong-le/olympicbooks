import { OnInit, Directive } from '@angular/core';
import { RequestQueryBuilder, CondOperator } from '@nestjsx/crud-request';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Pagination } from '../Interfaces/pagination.interface';
import { BaseService } from './base.service';

@Directive()
export abstract class BaseComponent<T> implements OnInit {
  qb: RequestQueryBuilder;
  data: T[];

  isLoading = false;
  searchInputById: number;
  total: number;
  pageIndex = 1;
  pageSize = 10;

  constructor(private service: BaseService<T>) {
    this.qb = RequestQueryBuilder.create().sortBy({ field: 'id', order: 'DESC' }).setPage(this.pageIndex).setLimit(this.pageSize);
  }

  ngOnInit(): void {
    this.renderPage();
  }

  renderPage() {
    this.isLoading = true;
    this.service.getMany(this.qb.queryObject).subscribe(
      (response: Pagination<T[]>) => {
        this.data = response.data;
        this.total = response.total;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onSearchById() {
    delete this.qb.queryObject.filter;
    if (this.searchInputById) this.qb.setFilter({ field: 'id', operator: CondOperator.EQUALS, value: this.searchInputById });
    this.renderPage();
  }

  onTableQueryParamsChange(params: NzTableQueryParams): void {
    this.qb.setPage(params.pageIndex).setLimit(params.pageSize);
    const sort = params.sort.find((item) => item.value !== null);
    delete this.qb.queryObject.sort;
    sort
      ? this.qb.sortBy({ field: sort.key, order: sort.value === 'ascend' ? 'ASC' : 'DESC' })
      : this.qb.sortBy({ field: 'id', order: 'DESC' });
    this.renderPage();
  }
}

import { Directive, OnInit, TemplateRef } from '@angular/core';
import { CondOperator, RequestQueryBuilder } from '@nestjsx/crud-request';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { Pagination } from '../../Interfaces/pagination.interface';
import { BaseTableService } from './base-table.service';

@Directive()
export abstract class BaseTableComponent<T> implements OnInit {
  qb: RequestQueryBuilder;
  data: T[];

  isLoading = false;
  total: number;
  pageIndex = 1;
  pageSize = 10;

  searchInputById: number;
  searchInputByName: string;
  searchInputByTitle: string;

  constructor(
    private service: BaseTableService<T>,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    this.qb = RequestQueryBuilder.create()
      .sortBy({ field: 'id', order: 'DESC' })
      .setPage(this.pageIndex)
      .setLimit(this.pageSize);
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
        this.messageService.error(error?.error?.message);
        this.isLoading = false;
      }
    );
  }

  onSearchById() {
    delete this.qb.queryObject.filter;
    if (this.searchInputById)
      this.qb.setFilter({
        field: 'id',
        operator: CondOperator.EQUALS,
        value: this.searchInputById
      });
    this.renderPage();
  }

  onSearchByName() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByName)
      this.qb.setFilter({
        field: 'name',
        operator: CondOperator.CONTAINS_LOW,
        value: this.searchInputByName
      });
    this.renderPage();
  }

  onSearchByTitle() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByTitle)
      this.qb.setFilter({
        field: 'title',
        operator: CondOperator.CONTAINS_LOW,
        value: this.searchInputByTitle
      });
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

  showDetailModal(modalContent: TemplateRef<{}>, item: T): void {
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

  showDeleteConfirmModal(id: number) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzOnOk: () => this.delete(id)
    });
  }

  delete(id: number) {
    this.isLoading = true;
    this.service.deleteOne(id).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Xoá thành công!');
        this.renderPage();
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }
}

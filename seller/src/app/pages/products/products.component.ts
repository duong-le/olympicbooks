import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { Product } from '../../shared/Interfaces/product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  shopId: number;
  products: Product[];

  isLoading = false;
  pageSize = 10;
  pageIndex = 1;
  total: number;

  queryParams = {
    sort: 'id,ASC',
    page: '1',
    limit: String(this.pageSize)
  };

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Sản phẩm', key: 'title', sort: true, width: '20%' },
    { title: 'Danh mục', key: 'category.id', sort: true },
    { title: 'Trạng thái', key: 'status', sort: true },
    { title: 'Giá bán', key: 'price', sort: true },
    { title: 'Giá gốc', key: 'originalPrice', sort: true }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(({ shopId }) => {
      this.shopId = shopId;
      this.renderProductsTable();
    });
  }

  renderProductsTable() {
    this.isLoading = true;
    this.productsService.getMany(this.shopId, this.queryParams).subscribe((response) => {
      this.products = response['data'];
      this.total = response['total'];
      this.pageIndex = response['page'];
      this.isLoading = false;
    });
  }

  showDetailModal(modalContent: TemplateRef<{}>, item: Product): void {
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

  delete(productId: number) {
    this.isLoading = true;
    this.productsService.deleteOne(this.shopId, productId).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Xoá thành công!');
        this.renderProductsTable();
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  changeQueryParams(params: NzTableQueryParams): void {
    this.queryParams.page = String(params.pageIndex);
    this.queryParams.limit = String(params.pageSize);
    this.renderProductsTable();
  }
}

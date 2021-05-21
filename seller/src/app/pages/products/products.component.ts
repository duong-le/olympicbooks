import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  total: number;
  pageIndex = 1;
  pageSize = 10;

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Sản phẩm', key: 'title', sort: true, width: '20%' },
    { title: 'Danh mục', key: 'category.id', sort: true },
    { title: 'Nhà xuất bản', key: 'publisher.id', sort: true },
    { title: 'Tác giả' },
    { title: 'Có hàng', key: 'inStock', sort: true },
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
    this.productsService.getMany(this.shopId).subscribe((response) => {
      this.products = response;
      this.total = response.length;
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
}

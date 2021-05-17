import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseComponent } from '../../shared/Base/base.component';
import { Product } from '../../shared/Interfaces/product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent<Product> {
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
    private productsService: ProductsService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(productsService, messageService, modalService);
  }
}

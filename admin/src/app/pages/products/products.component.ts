import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from 'src/environments/environment';

import { BaseTableComponent } from '../../shared/Components/base-table/base-table.component';
import { Product } from '../../shared/Interfaces/product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseTableComponent<Product> {
  storeUrl = environment.storeUrl;

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
    private productsService: ProductsService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(productsService, messageService, modalService);
  }
}

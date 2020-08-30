import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { RequestQueryBuilder, CondOperator } from '@nestjsx/crud-request';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  qb: RequestQueryBuilder;

  searchInputById: number;
  searchInputByTitle: string;
  isLoading = false;
  total: number;
  pageIndex = 1;
  pageSize = 10;

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Sản phẩm', key: 'title', sort: true },
    { title: 'Danh mục', key: 'category.id', sort: true },
    { title: 'Số trang', key: 'pages', sort: true },
    { title: 'Năm xuất bản', key: 'publicationYear', sort: true },
    { title: 'Giá bán', key: 'price', sort: true },
    { title: 'Giá gốc', key: 'originalPrice', sort: true },
    { title: 'Stock', key: 'stock', sort: true },
    { title: 'Nhà xuất bản', key: 'publisher.id', sort: true },
    { title: 'Tác giả' }
  ];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.qb = RequestQueryBuilder.create().sortBy({ field: 'id', order: 'DESC' }).setPage(this.pageIndex).setLimit(this.pageSize);
    this.renderProducts();
  }

  renderProducts() {
    this.isLoading = true;
    this.productsService.getManyProducts(this.qb.queryObject).subscribe((response) => {
      this.products = response.data;
      this.total = response.total;
      this.isLoading = false;
    });
  }

  onSearch() {
    delete this.qb.queryObject.filter;
    this.searchInputById && this.qb.setFilter({ field: 'id', operator: CondOperator.EQUALS, value: this.searchInputById });
    this.searchInputByTitle && this.qb.setFilter({ field: 'title', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByTitle });
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

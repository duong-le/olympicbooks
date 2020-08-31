import { Component, OnInit } from '@angular/core';
import { RequestQueryBuilder, CondOperator } from '@nestjsx/crud-request';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CategoriesService } from './categories.service';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
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
    { title: 'Danh mục', key: 'title', sort: true },
    { title: 'Hình ảnh' }
  ];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.qb = RequestQueryBuilder.create().sortBy({ field: 'id', order: 'DESC' }).setPage(this.pageIndex).setLimit(this.pageSize);
    this.renderProducts();
  }

  renderProducts() {
    this.isLoading = true;
    this.categoriesService.getManyCategories(this.qb.queryObject).subscribe((response) => {
      this.categories = response.data;
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

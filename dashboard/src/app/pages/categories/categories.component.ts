import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';
import { BaseComponent } from 'src/app/shared/Base/base.component';
import { Category } from 'src/app/shared/Interfaces/category.interface';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseComponent<Category> {
  searchInputByTitle: string;

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Danh mục', key: 'title', sort: true },
    { title: 'Hình ảnh' }
  ];

  constructor(private categoriesService: CategoriesService) {
    super(categoriesService);
  }

  onSearchByTitle() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByTitle) this.qb.setFilter({ field: 'title', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByTitle });
    this.renderPage();
  }
}

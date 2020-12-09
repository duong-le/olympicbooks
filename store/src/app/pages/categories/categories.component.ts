import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CondOperator, QuerySortOperator, RequestQueryBuilder } from '@nestjsx/crud-request';
import { NzSliderValue } from 'ng-zorro-antd/slider';
import { forkJoin } from 'rxjs';

import { Author } from '../../shared/Interfaces/author.interface';
import { Category } from '../../shared/Interfaces/category.interface';
import { Product } from '../../shared/Interfaces/product.interface';
import { Publisher } from '../../shared/Interfaces/publisher.interface';
import { Summary } from '../../shared/Interfaces/summary';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  qb: RequestQueryBuilder;
  category: Category;
  products: Product[];
  publishers: Summary<Publisher>[];
  authors: Summary<Author>[];

  isLoading = false;
  categoryId: number;
  productPerPage = 12;
  totalProduct: number;
  pageIndex: number;
  maxPrice = 1000000;
  priceRange = [0, this.maxPrice];
  productsStyle = null;
  categoriesStyle = null;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.categoryId = Number(id);
      this.resetStateForRouting();
      this.renderCategory();
      this.qb = RequestQueryBuilder.create()
        .setFilter({ field: 'categoryId', operator: CondOperator.EQUALS, value: this.categoryId })
        .sortBy({ field: 'id', order: 'DESC' })
        .setPage(1)
        .setLimit(this.productPerPage);
      this.renderCategoryProducts();
    });
  }

  renderCategory() {
    forkJoin([
      this.categoriesService.getOneCategory(this.categoryId),
      this.categoriesService.getPublishersByCategory(this.categoryId),
      this.categoriesService.getAuthorsByCategory(this.categoryId)
    ]).subscribe(
      (response) => {
        [this.category, this.publishers, this.authors] = response;
        this.titleService.setTitle(`${this.category.title} | OlympicBooks`);
        this.categoriesStyle = { padding: '1px' };
      },
      (error) => this.router.navigate(['/'])
    );
  }

  renderCategoryProducts() {
    this.isLoading = true;
    this.productsService.getManyProducts(this.qb.queryObject).subscribe(
      (response) => {
        if (response['data'].length) {
          this.products = response['data'];
          this.totalProduct = response['total'];
          this.pageIndex = response['page'];
        }
        this.isLoading = false;
        this.productsStyle = { padding: '1px' };
      },
      (error) => this.router.navigate(['/'])
    );
  }

  onSortingChange(value: QuerySortOperator) {
    delete this.qb.queryObject.sort;
    this.qb.sortBy({ field: 'price', order: value });
    this.renderCategoryProducts();
  }

  onPriceRangeChange(value: NzSliderValue) {
    delete this.qb.queryObject.filter;
    this.qb
      .setFilter({ field: 'categoryId', operator: CondOperator.EQUALS, value: this.categoryId })
      .setFilter({ field: 'price', operator: CondOperator.GREATER_THAN, value: value[0] })
      .setFilter({ field: 'price', operator: CondOperator.LOWER_THAN, value: value[1] });
    this.renderCategoryProducts();
  }

  onPageChange(value: number) {
    this.qb.setPage(value);
    this.renderCategoryProducts();
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  resetStateForRouting() {
    if (this.category) {
      this.category = null;
      this.publishers = null;
      this.authors = null;
      this.totalProduct = this.productPerPage;
      this.categoriesStyle = null;
    }

    if (this.products) {
      this.products = null;
      this.productsStyle = null;
    }
  }
}

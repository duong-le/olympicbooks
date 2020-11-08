import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestQueryBuilder, CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { forkJoin } from 'rxjs';
import { NzSliderValue } from 'ng-zorro-antd/slider';
import { Category } from 'src/app/shared/Interfaces/category.interface';
import { CategoriesService } from './categories.service';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { ProductsService } from '../products/products.service';
import { Summary } from 'src/app/shared/Interfaces/summary';
import { Publisher } from 'src/app/shared/Interfaces/publisher.interface';
import { Author } from 'src/app/shared/Interfaces/author.interface';

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
  rangeValue = [0, 1000000];
  maxPrice = 1000000;
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
    this.activatedRoute.params.subscribe((paramsId) => {
      this.categoryId = Number(paramsId.id);
      this.renderCategory();

      this.qb = RequestQueryBuilder.create()
        .setFilter({ field: 'categoryId', operator: CondOperator.EQUALS, value: this.categoryId })
        .sortBy({ field: 'id', order: 'DESC' })
        .setPage(1)
        .setLimit(this.productPerPage);
      this.renderProducts();
    });
  }

  renderCategory() {
    if (this.category) {
      this.category = null;
      this.publishers = null;
      this.authors = null;
      this.totalProduct = this.productPerPage;
      this.categoriesStyle = null;
    }

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

  renderProducts() {
    if (this.products) {
      this.products = null;
      this.productsStyle = null;
    }
    this.isLoading = true;

    this.productsService.getManyProducts(this.qb.queryObject).subscribe(
      (response) => {
        this.products = response['data'];
        this.totalProduct = response['total'];
        this.pageIndex = response['page'];
        this.isLoading = false;
        this.productsStyle = { padding: '1px' };
      },
      (error) => this.router.navigate(['/'])
    );
  }

  onSortingChange(value: QuerySortOperator) {
    delete this.qb.queryObject.sort;
    this.qb.sortBy({ field: 'price', order: value });
    this.renderProducts();
  }

  onPriceRangeChange(value: NzSliderValue) {
    delete this.qb.queryObject.filter;
    this.qb
      .setFilter({ field: 'categoryId', operator: CondOperator.EQUALS, value: this.categoryId })
      .setFilter({ field: 'price', operator: CondOperator.GREATER_THAN, value: value[0] })
      .setFilter({ field: 'price', operator: CondOperator.LOWER_THAN, value: value[1] });
    this.renderProducts();
  }

  onPageChange(value: number) {
    this.qb.setPage(value);
    this.renderProducts();
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(value);
  }
}

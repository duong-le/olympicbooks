import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestQueryBuilder, CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { combineLatest } from 'rxjs';
import { Category } from 'src/app/shared/Interfaces/category.interface';
import { CategoriesService } from './categories.service';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { ProductsService } from '../products/products.service';
import { Count } from 'src/app/shared/Interfaces/count.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  qb: RequestQueryBuilder;
  category: Category;
  products: Product[];
  publishers: Count[];
  authors: Count[];

  limit = 12;
  categoryId: number;
  totalProduct: number;
  pageIndex: number
  rangeValue = [0, 1000000];
  maxPrice = 1000000;
  demoValue = 3;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.categoryId = Number(paramsId.id);

      this.qb = RequestQueryBuilder.create()
        .setFilter({ field: 'categoryId', operator: CondOperator.EQUALS, value: this.categoryId })
        .sortBy({ field: 'id', order: 'DESC' })
        .setPage(1)
        .setLimit(this.limit);

      combineLatest(
        this.categoriesService.categories$,
        this.categoriesService.getPublishersByCategory(this.categoryId),
        this.categoriesService.getAuthorsByCategory(this.categoryId),
      )
        .subscribe(
          (response) => {
            this.category = response[0].find((el) => el.id === this.categoryId);
            this.publishers = response[1];
            this.authors = response[2];
            this.titleService.setTitle(`${this.category.title} | Olymbooks`);
          });

      this.renderProducts();
    });
  }

  renderProducts() {
    this.productsService.getManyProducts(this.qb.queryObject).subscribe(
      (response) => {
        this.products = response['data'];
        this.totalProduct = response['total'];
        this.pageIndex = response['page']
      },
      (error) => this.router.navigate(['/'])
    );
  }

  onOptionChange(value: QuerySortOperator) {
    delete this.qb.queryObject.sort;
    this.qb.sortBy({ field: 'price', order: value });
    this.renderProducts();
  }

  onSliderAfterChange(value) {
    delete this.qb.queryObject.filter;
    this.qb
      .setFilter({ field: 'categoryId', operator: CondOperator.EQUALS, value: this.categoryId })
      .setFilter({ field: 'price', operator: CondOperator.GREATER_THAN, value: value[0] })
      .setFilter({ field: 'price', operator: CondOperator.LOWER_THAN, value: value[1] });
    this.renderProducts();
  }

  changePage(value: number) {
    this.qb.setPage(value);
    this.renderProducts();
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(value);
  }
}

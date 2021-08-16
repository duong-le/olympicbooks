import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSliderValue } from 'ng-zorro-antd/slider';

import { CollectionBaseComponent } from '../../shared/Components/collection/collection-base.component';
import { Category } from '../../shared/Interfaces/category.interface';
import { Product } from '../../shared/Interfaces/product.interface';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends CollectionBaseComponent implements OnInit {
  category: Category;
  products: Product[];

  categoryId: number;
  categoriesStyle = null;

  constructor(
    public productsService: ProductsService,
    public router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    super(productsService, router);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ categorySlug }) => {
      this.categoryId = Number(categorySlug.split('-').pop());
      if (!this.categoryId) {
        this.router.navigate(['/not-found'], { skipLocationChange: true });
        return;
      }

      this.resetStateForRouting(`categoryId||$eq||${this.categoryId}`);
      this.renderCategory();
      this.renderProducts();
    });
  }

  renderCategory() {
    this.categoriesStyle = null;
    this.categoriesService.getOneCategory(this.categoryId).subscribe(
      (response) => {
        this.category = response;
        this.titleService.setTitle(`${this.category.title} | OlympicBooks`);
        this.categoriesStyle = { padding: '1px' };
      },
      (error) => this.router.navigate(['/not-found'], { skipLocationChange: true })
    );
  }

  onPriceRangeChange(value: NzSliderValue) {
    this.queryParams.filter = [
      `categoryId||$eq||${this.categoryId}`,
      `price||$between||${value[0]},${value[1]}`
    ];
    this.queryParams.page = '1';
    this.renderProducts();
  }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';

import { Category } from '../../shared/Interfaces/category.interface';
import { Product } from '../../shared/Interfaces/product.interface';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[];
  newProducts: Product[];
  topSellingProducts: Product[];

  isLoading = false;
  maxProductPerRow = 6;
  banner = { left: 'assets/images/cover.png', right: 'assets/images/community.jpg' };
  cardStyle = null;

  constructor(private titleService: Title, private categoriesService: CategoriesService, private productsService: ProductsService) {
    this.titleService.setTitle('Trang chủ | OlympicBooks');
  }

  ngOnInit() {
    this.isLoading = true;
    combineLatest([
      this.categoriesService.categories$,
      this.productsService.getManyProducts({ limit: this.maxProductPerRow, sort: 'updatedAt,DESC', filter: 'inStock||$eq||true' }),
      this.productsService.getManyProducts({ limit: this.maxProductPerRow, topSelling: true, filter: 'inStock||$eq||true' })
    ]).subscribe(
      (response) => {
        [this.categories, this.newProducts, this.topSellingProducts] = response;
        this.isLoading = false;
        this.cardStyle = { padding: '1px' };
      },
      (error) => {}
    );
  }
}

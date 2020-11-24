import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { Category } from 'src/app/shared/Interfaces/category.interface';
import { CategoriesService } from '../categories/categories.service';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[];
  recommendedProducts: Product[];

  isLoading = false;
  maxRecommendedProduct = 6;
  banner = { left: 'assets/images/cover.png', right: 'assets/images/community.jpg' };
  cardStyle = null;

  constructor(
    private titleService: Title,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {
    this.titleService.setTitle('Trang chủ | OlympicBooks');
  }

  ngOnInit() {
    this.isLoading = true;
    combineLatest([
      this.categoriesService.categories$,
      this.productsService.getManyProducts({ limit: this.maxRecommendedProduct, sort: 'updatedAt,DESC' })
    ]).subscribe(
      (response) => {
        [this.categories, this.recommendedProducts] = response;
        this.isLoading = false;
        this.cardStyle = { padding: '1px' };
      },
      (error) => {}
    );
  }
}

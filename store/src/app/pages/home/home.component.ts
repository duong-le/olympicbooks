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
  recommendations: Product[];

  isLoading = false;
  limit = 6;
  hero = 'assets/images/hero.jpg';
  banner = {
    left: { src: 'assets/images/community.jpg', caption: 'Cộng Đồng' },
    right: { src: 'assets/images/new-arrivals.jpg', caption: 'Sản Phẩm Mới' }
  };
  cardStyle = null;

  constructor(private titleService: Title, private categoriesService: CategoriesService, private productsService: ProductsService) {
    this.titleService.setTitle('Trang chủ | Olympicbooks');
  }

  ngOnInit() {
    this.isLoading = true;
    combineLatest(this.categoriesService.categories$, this.productsService.getManyProducts({ limit: this.limit })).subscribe(
      (response) => {
        [this.categories, this.recommendations] = response;
        this.isLoading = false;
        this.cardStyle = { padding: '1px' };
      },
      (error) => {}
    );
  }
}

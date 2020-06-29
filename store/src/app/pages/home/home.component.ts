import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoriesService } from '../categories/categories.service';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[];
  hotDeals;
  recommendations;

  bookData = [
    { title: 'Chiến tranh và hòa bình', price: 1500000 },
    { title: 'Thần Thoại Bắc Âu', price: 1500000, new: true },
    { title: 'Không gia đình', price: 1500000 },
    {
      title:
        'Lập trình hướng đối tượng dành cho người mới bắt đầu học lập trình',
      salePrice: 1000000,
      price: 1500000,
      sale: true
    },
    {
      title: 'Vi Điều Khiển Và Ứng Dụng - Arduino Dành Cho Người Tự Học',
      price: 1500000
    },
    { title: 'Khi Hơi Thở Hóa Thinh Không ', price: 1500000, hot: true }
  ];

  hero = 'assets/images/hero.jpg';

  banner = {
    left: {
      src: 'assets/images/community.jpg',
      caption: 'Cộng Đồng'
    },
    right: {
      src: 'assets/images/new-arrivals.jpg',
      caption: 'Sản Phẩm Mới'
    }
  };

  constructor(
    private titleService: Title,
    private categoriesService: CategoriesService
  ) {
    this.titleService.setTitle('Trang chủ | Olymbooks');

    this.hotDeals = this.bookData.map((el, idx) => ({
      ...el,
      id: idx + 1,
      src: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/460`,
      salePrice: 1000000,
      sale: true
    }));

    this.recommendations = this.bookData.map((el, idx) => ({
      ...el,
      id: idx + 1,
      src: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/460`
    }));
  }

  ngOnInit() {
    this.categoriesService.getManyCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {}
    );
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  products;
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
    { title: 'Khi Hơi Thở Hóa Thinh Không ', price: 1500000, hot: true },
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

  publishers = [
    { name: 'Nhân Trí Việt', quantity: 19 },
    { name: 'NXB Trẻ', quantity: 103 },
    { name: 'Nhà Sách Phương Nam', quantity: 7 },
    { name: 'Nhã Nam', quantity: 56 }
  ];

  authors = [
    { name: 'William Shakespeare', quantity: 208 },
    { name: 'J. K. Rowling', quantity: 11 },
    { name: 'Stephen King', quantity: 53 },
    { name: 'Sidney Sheldon', quantity: 27 }
  ];

  rangeValue = [0, 1800000];
  maxPrice = 2000000;

  constructor() {}

  ngOnInit() {
    this.products = this.bookData.map((el, idx) => ({
      ...el,
      id: idx + 1,
      img: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/460`
    }));
  }

  onOptionChange(value) {
    console.log(value);
  }

  onSliderAfterChange(value) {
    console.log(value);
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('vn-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }
}

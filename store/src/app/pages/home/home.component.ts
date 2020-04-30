import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  categories;
  hotDeals;
  recommendations;

  categoriesData = [
    'Sách văn học',
    'Sách kinh tế',
    'Sách thiếu nhi',
    'Sách kỹ năng sống',
    'Sách Giáo Khoa - Giáo Trình',
    'Sách Ngoại Ngữ',
    'Sách Tham Khảo',
    'Sách Khoa Học - Kỹ Thuật',
    'Truyện Tranh, Manga, Comic',
    'Sách Văn Hóa - Địa Lý - Du Lịch',
    'Sách Chính Trị - Pháp Lý',
    'Sách Công Nghệ Thông Tin'
  ];

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

  items = [
    'assets/images/banner-1.jpg',
    'assets/images/banner-2.jpg',
    'assets/images/banner-3.jpg'
  ];

  banner = {
    left: {
      img: 'assets/images/community.jpg',
      content: 'Community'
    },
    right: {
      img: 'assets/images/new-arrivals.jpg',
      content: 'New Arrivals'
    }
  };

  constructor() {
    this.categories = this.categoriesData.map((el, idx) => ({
      title: el,
      id: idx + 1,
      img: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/500`,
      ...((idx + 1) % 4 === 0 && { new: true })
    }));

    this.hotDeals = this.bookData.map((el, idx) => ({
      ...el,
      id: idx + 1,
      img: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/500`,
      salePrice: 1000000,
      sale: true
    }));

    this.recommendations = this.bookData.map((el, idx) => ({
      ...el,
      id: idx + 1,
      img: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/500`
    }));
  }
}

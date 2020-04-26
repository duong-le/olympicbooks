import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  categories;

  items = [
    'assets/images/banner-1.jpg',
    'assets/images/banner-2.jpg',
    'assets/images/banner-3.jpg',
  ];

  banner = {
    left: {
      img: 'assets/images/community.jpg',
      content: 'Community',
    },
    right: {
      img: 'assets/images/new-arrivals.jpg',
      content: 'New Arrivals',
    },
  };

  constructor() {
    this.categories = [...Array(12)].map(
      (_, idx, arr) =>
        (arr[idx] = {
          title: 'Category',
          img: `https://picsum.photos/seed/${Math.floor(
            Math.random() * 1000
          )}/300`,
        })
    );
  }
}

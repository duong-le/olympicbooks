import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  array = [1, 2, 3, 4];

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

  constructor() {}
}

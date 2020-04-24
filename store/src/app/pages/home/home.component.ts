import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  array = [1, 2, 3, 4];

  items = [
    {
      img: 'assets/images/banner-1.jpg',
      content: 'Hello',
    },
    {
      img: 'assets/images/banner-2.jpg',
      content: 'Hello',
    },
    {
      img: 'assets/images/banner-3.jpg',
      content: 'Hello',
    },
  ];

  constructor() {}
}

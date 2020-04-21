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
      img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
      content: 'Hello',
    },
    {
      img: 'https://images.unsplash.com/photo-1521036392421-35d436448d6a',
      content: 'Hello',
    },
    {
      img: 'https://images.unsplash.com/photo-1571459882268-fa847595cb77',
      content: 'Hello',
    },
  ];

  constructor() {}
}

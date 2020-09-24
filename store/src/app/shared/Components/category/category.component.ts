import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;

  isLoading = true;
  constructor() {}

  ngOnInit() {
    if (!this.category.imgUrl) this.isLoading = false;
  }

  onLoadImage(evt) {
    if (evt && evt.target) this.isLoading = false;
  }
}

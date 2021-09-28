import { Component, Input } from '@angular/core';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Component({
  selector: 'app-category',
  template: `
    <a [routerLink]="['/danh-muc', category?.slug]">
      <img
        nz-image
        [nzSrc]="category?.imgUrl"
        [alt]="category?.imgName || 'category-image'"
        height="70px"
        width="70px"
        nzPlaceholder="assets/images/placeholder.png"
        nzFallback="assets/images/placeholder.png"
        [nzDisablePreview]="true"
      />
      <h3>{{ category.title }}</h3>
      <!-- <div class="item-extra item-new" *ngIf="category.new && !isLoading">New</div> -->
    </a>
  `,
  styles: [
    `
      a {
        text-align: center;
        display: block;
      }

      h3 {
        margin-top: 16px;
        margin-bottom: 0;
      }
    `
  ]
})
export class CategoryComponent {
  @Input() category: Category;

  constructor() {}
}

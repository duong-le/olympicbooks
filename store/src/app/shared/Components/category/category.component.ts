import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Component({
  selector: 'app-category',
  template: `
    <a [routerLink]="['/categories', category?.id]">
      <nz-card nzHoverable [nzCover]="coverTemplate" [nzBordered]="false" [nzLoading]="isLoading">
        <h3>{{ category.title }}</h3>
      </nz-card>
      <ng-template #coverTemplate>
        <img
          nz-image
          [nzSrc]="category?.imgUrl"
          [alt]="category?.imgName || 'category-image'"
          nzPlaceholder="assets/images/placeholder.png"
          nzFallback="assets/images/placeholder.png"
          [nzDisablePreview]="true"
          (load)="onLoadImage($event)"
        />
      </ng-template>
      <!-- <div class="item-extra item-new" *ngIf="category.new && !isLoading">New</div> -->
    </a>
  `,
  styles: [
    `
      .ant-card {
        text-align: center;
        height: 100%;
      }

      h3 {
        margin-bottom: 0;
      }
    `
  ]
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;

  isLoading = true;
  constructor() {}

  ngOnInit() {
    if (!this.category.imgUrl) this.isLoading = false;
  }

  onLoadImage(event: Event) {
    if (event && event.target) this.isLoading = false;
  }
}

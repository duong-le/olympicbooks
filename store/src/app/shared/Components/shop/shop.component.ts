import { Component, Input } from '@angular/core';

import { Shop } from '../../Interfaces/shop.interface';

@Component({
  selector: 'app-shop',
  template: `
    <a [routerLink]="['/shops', shop?.id]">
      <nz-card [nzCover]="coverTemplate" [nzBordered]="false" [nzLoading]="isLoading">
        <nz-card-meta [nzTitle]="shop?.name" [nzDescription]="shop?.description"></nz-card-meta>
      </nz-card>

      <ng-template #coverTemplate>
        <img
          nz-image
          [nzSrc]="shop?.coverImgUrl"
          [alt]="shop?.name"
          nzPlaceholder="assets/images/placeholder.png"
          nzFallback="assets/images/placeholder.png"
          [nzDisablePreview]="true"
          (load)="onLoadImage($event)"
        />
      </ng-template>
    </a>
  `,
  styles: [
    `
      .ant-card {
        text-align: center;
        height: 100%;
      }

      :host ::ng-deep .ant-card-meta-description {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `
  ]
})
export class ShopComponent {
  @Input() shop: Shop;

  isLoading = true;

  constructor() {}

  onLoadImage(event: Event) {
    if (event && event.target) this.isLoading = false;
  }
}

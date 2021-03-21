import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../shared/Interfaces/product.interface';

@Component({
  selector: 'app-product',
  template: ` <a [routerLink]="['/products', product.id]">
    <nz-card nzHoverable [nzCover]="coverTemplate" [nzBordered]="false" [nzLoading]="isLoading">
      <p class="product-title">{{ product.title }}</p>
      <h3 class="product-price">{{ product.price | price }}</h3>
      <span *ngIf="product.price !== product.originalPrice">
        <del>{{ product.originalPrice | price }}</del>
      </span>
    </nz-card>

    <ng-template #coverTemplate>
      <img
        nz-image
        [nzSrc]="product.images[0]?.imgUrl"
        [alt]="product.images[0]?.imgName || 'product-image'"
        nzPlaceholder="assets/images/placeholder.png"
        nzFallback="assets/images/placeholder.png"
        [nzDisablePreview]="true"
        (load)="onLoadImage($event)"
      />
    </ng-template>

    <!-- <div class="item-extra item-new" *ngIf="product.new && !isLoading">New</div>
    <div class="item-extra item-hot" *ngIf="product.hot && !isLoading">Hot</div>
    <div class="item-extra item-sale" *ngIf="product.sale && !isLoading">Sale</div> -->
  </a>`,
  styles: [
    `
      .ant-card {
        text-align: center;
        height: 100%;
      }

      .product-title {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .product-price {
        color: #337ab7;
        margin-bottom: 0;
      }
    `
  ]
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  isLoading = true;

  constructor() {}

  ngOnInit() {
    if (!this.product.images.length) this.isLoading = false;
    else this.product.images.sort((a, b) => a.id - b.id);
  }

  onLoadImage(event: Event) {
    if (event && event.target) this.isLoading = false;
  }
}

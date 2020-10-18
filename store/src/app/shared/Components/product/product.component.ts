import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/Interfaces/product.interface';

@Component({
  selector: 'app-product',
  template: ` <a [routerLink]="['/products', product.id]">
    <nz-card nzHoverable [nzCover]="coverTemplate" [nzBordered]="false" [nzLoading]="isLoading">
      <p>{{ product.title | slice: 0:maxLength }}{{ product.title.length > maxLength ? '...' : '' }}</p>
      <h3 class="price">{{ product.price | price }}</h3>
      <span *ngIf="product.price !== product.originalPrice"
        ><del>{{ product.originalPrice | price }}</del></span
      >
    </nz-card>

    <ng-template #coverTemplate>
      <img [src]="product.images[0]?.imgUrl" loading="lazy" (load)="onLoadImage($event)" />
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

      .price {
        color: #337ab7;
        margin-bottom: 0;
      }
    `
  ]
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  isLoading = true;
  maxLength = 48;

  constructor() {}

  ngOnInit() {
    if (!this.product.images.length) this.isLoading = false;
    else this.product.images.sort((a, b) => a.id - b.id);
  }

  onLoadImage(evt) {
    if (evt && evt.target) this.isLoading = false;
  }
}

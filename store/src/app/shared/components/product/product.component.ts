import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any;

  loading = true;
  maxLength = 48;
  constructor() {}

  onLoadImage(evt) {
    if (evt && evt.target) {
      this.loading = false;
    }
  }
}

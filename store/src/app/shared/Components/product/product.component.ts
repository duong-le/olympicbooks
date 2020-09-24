import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/Interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;

  isLoading = true;
  maxLength = 48;

  constructor() {}

  onLoadImage(evt) {
    if (evt && evt.target) this.isLoading = false;
  }
}

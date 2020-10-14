import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/Interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
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

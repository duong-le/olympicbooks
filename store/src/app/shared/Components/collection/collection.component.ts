import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { NzSliderValue } from 'ng-zorro-antd/slider';

import { Product } from '../../Interfaces/product.interface';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnChanges {
  @Input() products: Product[];
  @Input() totalProducts: number;
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() isLoading: boolean;
  @Output() onSortingChange: EventEmitter<any> = new EventEmitter();
  @Output() onPriceRangeChange: EventEmitter<any> = new EventEmitter();
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  sortingOption = null;
  maxPrice = 1000000;
  priceRange = [0, this.maxPrice];
  productsStyle = null;

  constructor() {}

  ngOnChanges(): void {
    this.productsStyle = this.isLoading ? null : { padding: '1px' };
    if (!this.products?.length) {
      this.sortingOption = null;
      this.priceRange = [0, this.maxPrice];
    }
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  changeSorting(value: 'ASC' | 'DESC') {
    this.onSortingChange.emit(value);
  }

  changePriceRange(value: NzSliderValue) {
    this.onPriceRangeChange.emit(value);
  }

  changePage(value: number) {
    this.onPageChange.emit(value);
  }
}

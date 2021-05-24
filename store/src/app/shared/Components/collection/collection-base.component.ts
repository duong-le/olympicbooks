import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { NzSliderValue } from 'ng-zorro-antd/slider';

import { ProductsService } from '../../../pages/products/products.service';
import { Product } from '../../Interfaces/product.interface';

@Directive()
export abstract class CollectionBaseComponent {
  products: Product[];

  isLoading = false;
  productsPerPage = 12;
  queryParams = {
    filter: [],
    sort: 'id,DESC',
    page: '1',
    limit: String(this.productsPerPage)
  };

  constructor(public productsService: ProductsService, public router: Router) {}

  renderProducts() {
    this.isLoading = true;
    this.productsService.getManyProducts(this.queryParams).subscribe(
      (response) => {
        this.products = response['data'];
        this.isLoading = false;
      },
      (error) => this.router.navigate(['/'])
    );
  }

  onSortingChange(value: 'ASC' | 'DESC') {
    this.queryParams.sort = value ? `price,${value}` : 'id,DESC';
    this.renderProducts();
  }

  onPageChange(value: number) {
    this.queryParams.page = String(value);
    this.renderProducts();
  }

  abstract onPriceRangeChange(value: NzSliderValue): void;

  resetStateForRouting(...filter: string[]) {
    this.products = [];

    this.queryParams = {
      filter: filter,
      sort: 'id,DESC',
      page: '1',
      limit: String(this.productsPerPage)
    };
  }
}

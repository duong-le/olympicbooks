import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSliderValue } from 'ng-zorro-antd/slider';

import { CollectionBaseComponent } from '../../shared/Components/collection/collection-base.component';
import { Product } from '../../shared/Interfaces/product.interface';
import { Shop } from '../../shared/Interfaces/shop.interface';
import { ProductsService } from '../products/products.service';
import { ShopsService } from './shops.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent extends CollectionBaseComponent implements OnInit {
  shop: Shop;
  products: Product[];

  shopId: number;

  constructor(
    public productsService: ProductsService,
    public router: Router,
    private shopsService: ShopsService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    super(productsService, router);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ shopId }) => {
      this.shopId = shopId;
      this.resetStateForRouting(`shopId||$eq||${shopId}`);

      this.renderShop();
      this.renderProducts();
    });
  }

  renderShop() {
    this.shopsService.getOneShop(this.shopId).subscribe(
      (response) => {
        this.shop = response;
        this.titleService.setTitle(`${this.shop.name} | OlympicBooks`);
      },
      (error) => this.router.navigate(['/'])
    );
  }

  onPriceRangeChange(value: NzSliderValue) {
    const index = this.queryParams.filter.findIndex((filter) => filter.startsWith('price'));

    if (index !== -1) {
      this.queryParams.filter[index] = `price||$between||${value[0]},${value[1]}`;
    } else {
      this.queryParams.filter.push(`price||$between||${value[0]},${value[1]}`);
    }

    this.queryParams.page = '1';

    this.renderProducts();
  }

  onSearch(value: string) {
    const index = this.queryParams.filter.findIndex((filter) => filter.startsWith('title'));

    if (index !== -1) {
      if (value) this.queryParams.filter[index] = `title||$contL||${value}`;
      else this.queryParams.filter.splice(index, 1);
    } else {
      if (value) this.queryParams.filter.push(`title||$contL||${value}`);
      else return;
    }

    this.queryParams.page = '1';

    this.renderProducts();
  }
}

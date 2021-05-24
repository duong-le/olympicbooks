import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSliderValue } from 'ng-zorro-antd/slider';
import { Subscription } from 'rxjs';

import { ProductsService } from '../../pages/products/products.service';
import { CollectionBaseComponent } from '../../shared/Components/collection/collection-base.component';
import { Product } from '../../shared/Interfaces/product.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends CollectionBaseComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription$$: Subscription;

  keyword: string;

  constructor(
    public productsService: ProductsService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    super(productsService, router);
  }

  ngOnInit(): void {
    this.subscription$$ = this.activatedRoute.queryParams.subscribe(({ keyword }) => {
      if (keyword) {
        this.keyword = keyword;
        this.titleService.setTitle(`"${keyword}" | OlympicBooks`);
        this.resetStateForRouting(`title||$contL||${keyword}`);
        this.renderProducts();
      }
    });
  }

  onPriceRangeChange(value: NzSliderValue) {
    this.queryParams.filter = [`title||$contL||${this.keyword}`, `price||$between||${value[0]},${value[1]}`];
    this.queryParams.page = '1';
    this.renderProducts();
  }

  ngOnDestroy(): void {
    this.subscription$$.unsubscribe();
  }
}

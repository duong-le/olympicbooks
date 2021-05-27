import { NgModule } from '@angular/core';

import { OrderStatePipe } from './orders.pipe';
import { PricePipe } from './prices.pipe';
import { ProductStatusPipe } from './products.pipe';
import { ShopStatusPipe } from './shops.pipe';

@NgModule({
  declarations: [PricePipe, OrderStatePipe, ProductStatusPipe, ShopStatusPipe],
  exports: [PricePipe, OrderStatePipe, ProductStatusPipe, ShopStatusPipe]
})
export class PipesModule {}

import { NgModule } from '@angular/core';

import { AttributeInputModePipe } from './attributes.pipe';
import { OrderStatePipe } from './orders.pipe';
import { PricePipe } from './prices.pipe';
import { ProductStatusPipe } from './products.pipe';
import { ShopStatusPipe } from './shops.pipe';

@NgModule({
  declarations: [PricePipe, OrderStatePipe, ProductStatusPipe, ShopStatusPipe, AttributeInputModePipe],
  exports: [PricePipe, OrderStatePipe, ProductStatusPipe, ShopStatusPipe, AttributeInputModePipe]
})
export class PipesModule {}

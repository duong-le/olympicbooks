import { NgModule } from '@angular/core';

import { OrderStatePipe } from './orders.pipe';
import { PricePipe } from './prices.pipe';
import { ProductStatusPipe } from './products.pipe';

@NgModule({
  declarations: [PricePipe, OrderStatePipe, ProductStatusPipe],
  exports: [PricePipe, OrderStatePipe, ProductStatusPipe]
})
export class PipesModule {}

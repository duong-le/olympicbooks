import { NgModule } from '@angular/core';

import { OrderStatePipe } from './orders.pipe';
import { PricePipe } from './prices.pipe';

@NgModule({
  declarations: [PricePipe, OrderStatePipe],
  exports: [PricePipe, OrderStatePipe]
})
export class PipesModule {}

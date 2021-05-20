import { NgModule } from '@angular/core';

import { OrderStatePipe } from './order-state.pipe';
import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [PricePipe, OrderStatePipe],
  exports: [PricePipe, OrderStatePipe]
})
export class PipesModule {}

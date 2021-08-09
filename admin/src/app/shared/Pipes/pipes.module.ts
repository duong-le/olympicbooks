import { NgModule } from '@angular/core';

import { AttributeInputModePipe } from './attributes.pipe';
import { OrderStatePipe } from './orders.pipe';
import { PricePipe } from './prices.pipe';
import { ProductStatusPipe } from './products.pipe';

@NgModule({
  declarations: [PricePipe, OrderStatePipe, ProductStatusPipe, AttributeInputModePipe],
  exports: [PricePipe, OrderStatePipe, ProductStatusPipe, AttributeInputModePipe]
})
export class PipesModule {}

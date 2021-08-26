import { NgModule } from '@angular/core';

import { AttributeInputModePipe, AttributeMandatoryPipe } from './attributes.pipe';
import { OrderStatePipe } from './orders.pipe';
import { PricePipe } from './prices.pipe';
import { ProductStatusPipe } from './products.pipe';

@NgModule({
  declarations: [
    PricePipe,
    OrderStatePipe,
    ProductStatusPipe,
    AttributeInputModePipe,
    AttributeMandatoryPipe
  ],
  exports: [PricePipe, OrderStatePipe, ProductStatusPipe, AttributeInputModePipe, AttributeMandatoryPipe]
})
export class PipesModule {}

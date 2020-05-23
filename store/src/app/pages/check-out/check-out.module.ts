import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CartComponent } from './cart/cart.component';
import { ShipComponent } from './ship/ship.component';
import { PayComponent } from './pay/pay.component';
import { StepComponent } from './step/step.component';

@NgModule({
  declarations: [CartComponent, ShipComponent, PayComponent, StepComponent],
  imports: [CommonModule, CheckOutRoutingModule]
})
export class CheckOutModule {}

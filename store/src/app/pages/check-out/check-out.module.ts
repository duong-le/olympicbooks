import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from '../../icons-provider.module';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CartComponent } from './cart/cart.component';
import { ShipComponent } from './ship/ship.component';
import { PayComponent } from './pay/pay.component';
import { StepComponent } from './step.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [CartComponent, ShipComponent, PayComponent, StepComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconsProviderModule,
    CheckOutRoutingModule,
    NzCardModule,
    NzStepsModule,
    NzGridModule
  ]
})
export class CheckOutModule {}

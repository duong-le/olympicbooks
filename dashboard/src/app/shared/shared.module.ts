import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PricePipe } from './Pipes/price.pipe';
import { OrderStatePipe } from './Pipes/order-state.pipe';

import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [PricePipe, OrderStatePipe],
  imports: [CommonModule, RouterModule, NzMenuModule],
  exports: [PricePipe, OrderStatePipe]
})
export class SharedModule {}

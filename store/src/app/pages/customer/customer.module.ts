import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { IconsProviderModule } from '../../icons-provider.module';

import { OrdersComponent } from './orders/orders.component';

import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    IconsProviderModule,
    NzTableModule
  ]
})
export class CustomerModule {}

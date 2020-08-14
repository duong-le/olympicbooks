import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

import { CustomerComponent } from './customer.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [
    CustomerComponent,
    ProfileComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    SharedComponentsModule
  ]
})
export class CustomerModule {}

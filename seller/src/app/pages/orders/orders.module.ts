import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { IconsModule } from '../../shared/icons.module';
import { PipesModule } from '../../shared/Pipes/pipes.module';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent, OrdersDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    IconsModule,
    PipesModule,
    NzTableModule,
    NzSpaceModule,
    NzButtonModule,
    NzTagModule,
    NzDescriptionsModule,
    NzModalModule,
    NzMessageModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzSelectModule,
    NzAnchorModule,
    NzAffixModule,
    NzPageHeaderModule
  ]
})
export class OrdersModule {}

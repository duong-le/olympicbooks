import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { IconModule } from '../../shared/icon.module';
import { SellersRoutingModule } from './sellers-routing.module';
import { SellersComponent } from './sellers.component';

@NgModule({
  declarations: [SellersComponent],
  imports: [
    CommonModule,
    FormsModule,
    SellersRoutingModule,
    IconModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzSpaceModule,
    NzGridModule,
    NzModalModule,
    NzMessageModule,
    NzDescriptionsModule
  ]
})
export class SellersModule {}

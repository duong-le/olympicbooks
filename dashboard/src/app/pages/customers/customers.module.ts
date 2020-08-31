import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/icon.module';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomersRoutingModule,
    SharedModule,
    IconModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzSpaceModule,
    NzGridModule
  ]
})
export class CustomersModule {}

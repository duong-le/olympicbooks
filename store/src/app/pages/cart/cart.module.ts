import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { IconModule } from '../../shared/Modules/icon.module';
import { SharedModule } from '../../shared/Modules/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IconModule,
    CartRoutingModule,
    NzCardModule,
    NzGridModule,
    NzInputNumberModule,
    NzInputModule,
    NzDividerModule,
    NzButtonModule,
    NzMessageModule
  ]
})
export class CartModule {}

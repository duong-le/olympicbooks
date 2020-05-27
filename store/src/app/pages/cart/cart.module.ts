import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from '../../icons-provider.module';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconsProviderModule,
    CartRoutingModule,
    NzCardModule,
    NzGridModule,
    NzInputNumberModule,
    NzButtonModule,
    NzInputModule
  ]
})
export class CartModule {}

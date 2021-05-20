import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { SellersRoutingModule } from './sellers-routing.module';
import { SellersComponent } from './sellers.component';

@NgModule({
  declarations: [SellersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SellersRoutingModule,
    NzLayoutModule,
    NzCardModule,
    NzImageModule,
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzUploadModule,
    NzMessageModule
  ]
})
export class SellersModule {}

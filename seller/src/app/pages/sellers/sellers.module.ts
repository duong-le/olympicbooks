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
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { PipesModule } from '../../shared/Pipes/pipes.module';
import { SellersRoutingModule } from './sellers-routing.module';
import { SellersComponent } from './sellers.component';

@NgModule({
  declarations: [SellersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SellersRoutingModule,
    PipesModule,
    NzLayoutModule,
    NzCardModule,
    NzImageModule,
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzUploadModule,
    NzMessageModule,
    NzTagModule
  ]
})
export class SellersModule {}

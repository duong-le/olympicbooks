import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { IconsModule } from '../../shared/icons.module';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
  declarations: [ShopsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShopsRoutingModule,
    IconsModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzButtonModule,
    NzMessageModule,
    NzUploadModule
  ]
})
export class ShopsModule {}

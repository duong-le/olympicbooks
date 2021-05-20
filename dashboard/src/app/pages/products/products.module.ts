import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { IconsModule } from '../../shared/icons.module';
import { PipesModule } from '../../shared/Pipes/pipes.module';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent, ProductsDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    PipesModule,
    IconsModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzSpaceModule,
    NzGridModule,
    NzSwitchModule,
    NzFormModule,
    NzMessageModule,
    NzModalModule,
    NzTreeSelectModule,
    NzSelectModule,
    NzUploadModule,
    NzDescriptionsModule,
    NzImageModule
  ]
})
export class ProductsModule {}

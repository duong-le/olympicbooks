import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/icon.module';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    IconModule,
    SharedModule,
    NzCardModule,
    NzGridModule,
    NzSkeletonModule,
    NzCarouselModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzStatisticModule,
    NzInputNumberModule,
    NzButtonModule,
    NzListModule,
    NzCommentModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule
  ]
})
export class ProductsModule {}

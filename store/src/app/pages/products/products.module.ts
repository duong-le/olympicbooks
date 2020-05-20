import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { IconsProviderModule } from '../../icons-provider.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GalleryModule } from 'ng-gallery';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    IconsProviderModule,
    SharedComponentsModule,
    NzCardModule,
    NzGridModule,
    NzSkeletonModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzStatisticModule,
    NzInputNumberModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzListModule,
    NzCommentModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    GalleryModule
  ]
})
export class ProductsModule {}

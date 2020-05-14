import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { IconsProviderModule } from '../../icons-provider.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    IconsProviderModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzCardModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzSelectModule,
    NzSliderModule,
    NzListModule,
    NzPaginationModule
  ]
})
export class CategoriesModule {}

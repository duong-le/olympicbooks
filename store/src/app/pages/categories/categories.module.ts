import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IconModule } from '../../shared/Modules/icon.module';
import { SharedModule } from '../../shared/Modules/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, SharedModule, IconModule, CategoriesRoutingModule, NzGridModule, NzCardModule]
})
export class CategoriesModule {}

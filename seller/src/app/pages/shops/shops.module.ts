import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { IconsModule } from '../../shared/icons.module';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
  declarations: [ShopsComponent],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    IconsModule,
    NzLayoutModule,
    NzMenuModule,
    NzAlertModule,
    NzButtonModule
  ]
})
export class ShopsModule {}

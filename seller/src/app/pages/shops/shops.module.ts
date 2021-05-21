import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { IconsModule } from '../../shared/icons.module';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
  declarations: [ShopsComponent],
  imports: [CommonModule, ShopsRoutingModule, IconsModule, NzLayoutModule, NzMenuModule]
})
export class ShopsModule {}

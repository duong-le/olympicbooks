import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { SharedModule } from '../../shared/Modules/shared.module';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
  declarations: [ShopsComponent],
  imports: [CommonModule, ShopsRoutingModule, SharedModule, NzPageHeaderModule, NzAvatarModule]
})
export class ShopsModule {}

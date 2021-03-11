import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/icon.module';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, SharedModule, IconModule, LayoutRoutingModule, NzLayoutModule, NzMenuModule, NzGridModule, NzSwitchModule]
})
export class LayoutModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { IconModule } from '../../shared/Modules/icon.module';
import { SharedModule } from '../../shared/Modules/shared.module';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';

@NgModule({
  declarations: [CheckOutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    SharedModule,
    CheckOutRoutingModule,
    NzGridModule,
    NzCardModule,
    NzModalModule,
    NzRadioModule,
    NzTagModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzAlertModule,
    NzCollapseModule
  ]
})
export class CheckOutModule {}

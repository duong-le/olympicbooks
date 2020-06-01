import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from '../../icons-provider.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [CheckOutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    SharedComponentsModule,
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
    NzInputModule
  ]
})
export class CheckOutModule {}

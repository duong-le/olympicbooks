import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { IconsModule } from '../../shared/icons.module';
import { PublishersDetailComponent } from './publishers-detail/publishers-detail.component';
import { PublishersRoutingModule } from './publishers-routing.module';
import { PublishersComponent } from './publishers.component';

@NgModule({
  declarations: [PublishersComponent, PublishersDetailComponent],
  imports: [
    CommonModule,
    PublishersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    NzCardModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzGridModule,
    NzSpaceModule,
    NzFormModule,
    NzMessageModule,
    NzModalModule
  ]
})
export class PublishersModule {}

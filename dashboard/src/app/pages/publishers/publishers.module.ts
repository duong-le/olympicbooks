import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconModule } from 'src/app/shared/icon.module';
import { PublishersRoutingModule } from './publishers-routing.module';
import { PublishersComponent } from './publishers.component';
import { PublishersDetailComponent } from './publishers-detail/publishers-detail.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [PublishersComponent, PublishersDetailComponent],
  imports: [
    CommonModule,
    PublishersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    NzCardModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzGridModule,
    NzSpaceModule,
    NzPageHeaderModule,
    NzFormModule,
    NzMessageModule,
    NzModalModule
  ]
})
export class PublishersModule {}

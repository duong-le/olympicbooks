import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconModule } from 'src/app/shared/icon.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { AuthorsDetailComponent } from './authors-detail/authors-detail.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [AuthorsComponent, AuthorsDetailComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
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
    NzFormModule,
    NzMessageModule,
    NzModalModule
  ]
})
export class AuthorsModule {}

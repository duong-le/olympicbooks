import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseComponent } from '../../shared/Base/base.component';
import { Admin } from '../../shared/Interfaces/admin.interface';
import { AdminsService } from './admins.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent extends BaseComponent<Admin> {
  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Họ tên', key: 'name', sort: true, width: '40%' },
    { title: 'Email', width: '40%' }
  ];

  constructor(
    private adminsService: AdminsService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(adminsService, messageService, modalService);
  }
}

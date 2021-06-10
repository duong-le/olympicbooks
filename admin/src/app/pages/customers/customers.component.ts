import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseComponent } from '../../shared/Base/base.component';
import { Customer } from '../../shared/Interfaces/customer.interface';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent<Customer> {
  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Họ tên', key: 'name', sort: true },
    { title: 'Email' },
    { title: 'Địa chỉ' },
    { title: 'Số điện thoại' }
  ];

  constructor(
    private customersService: CustomersService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(customersService, messageService, modalService);
  }
}

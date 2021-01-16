import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';

import { BaseComponent } from '../../shared/Base/base.component';
import { Customer } from '../../shared/Interfaces/customer.interface';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent<Customer> {
  searchInputByName: string;

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Họ tên', key: 'name', sort: true },
    { title: 'Email' },
    { title: 'Địa chỉ' },
    { title: 'Số điện thoại' }
  ];

  constructor(private customersService: CustomersService) {
    super(customersService);
  }

  onSearchByName() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByName) this.qb.setFilter({ field: 'name', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByName });
    this.renderPage();
  }
}

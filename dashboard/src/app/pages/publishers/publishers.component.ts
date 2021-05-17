import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseComponent } from '../../shared/Base/base.component';
import { Publisher } from '../../shared/Interfaces/publisher.interface';
import { PublishersService } from './publishers.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent extends BaseComponent<Publisher> {
  searchInputByName: number;

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Tên nhà xuất bản', key: 'name', sort: true, width: '70%' }
  ];

  constructor(
    private publishersService: PublishersService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(publishersService, messageService, modalService);
  }

  onSearchByName() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByName)
      this.qb.setFilter({
        field: 'name',
        operator: CondOperator.CONTAINS_LOW,
        value: this.searchInputByName
      });
    this.renderPage();
  }
}

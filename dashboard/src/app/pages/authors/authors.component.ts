import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseComponent } from '../../shared/Base/base.component';
import { Author } from '../../shared/Interfaces/author.interface';
import { AuthorsService } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent extends BaseComponent<Author> {
  searchInputByName: string;

  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Tên tác giả', key: 'name', sort: true, width: '70%' }
  ];

  constructor(
    private authorsService: AuthorsService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(authorsService, messageService, modalService);
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

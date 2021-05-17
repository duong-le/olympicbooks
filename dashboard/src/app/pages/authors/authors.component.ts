import { Component } from '@angular/core';
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
}

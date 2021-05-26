import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseComponent } from '../../shared/Base/base.component';
import { Shop } from '../../shared/Interfaces/shop.interface';
import { ShopsService } from './shops.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent extends BaseComponent<Shop> {
  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Tên', key: 'name', sort: true, width: '30%' },
    { title: 'Mô tả', key: 'description', sort: true, width: '30%' },
    { title: 'Nhà bán (SL)', width: '20%' }
  ];

  constructor(
    private shopsService: ShopsService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(shopsService, messageService, modalService);
  }
}

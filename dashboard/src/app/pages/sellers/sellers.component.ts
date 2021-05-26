import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BaseComponent } from '../../shared/Base/base.component';
import { Seller } from '../../shared/Interfaces/seller.interface';
import { SellersService } from './sellers.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent extends BaseComponent<Seller> {
  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Họ tên', key: 'name', sort: true, width: '30%' },
    { title: 'Email', width: '30%' },
    { title: 'Cửa hàng (SL)', width: '20%' }
  ];

  constructor(
    private sellersService: SellersService,
    public messageService: NzMessageService,
    public modalService: NzModalService
  ) {
    super(sellersService, messageService, modalService);
  }
}

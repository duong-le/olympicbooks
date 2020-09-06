import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/Base/base.component';
import { Publisher } from 'src/app/shared/Interfaces/publisher.interface';
import { PublishersService } from './publishers.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent extends BaseComponent<Publisher> {
  searchInputByName: number;

  columns = [{ title: 'Actions' }, { title: 'ID', key: 'id', sort: true }, { title: 'Tên nhà xuất bản', key: 'name', sort: true }];

  constructor(private publishersService: PublishersService, private messageService: NzMessageService, private modal: NzModalService) {
    super(publishersService);
  }

  onSearchByName() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByName) this.qb.setFilter({ field: 'name', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByName });
    this.renderPage();
  }

  showDeleteConfirm(id: number) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzOnOk: () => this.delete(id)
    });
  }

  delete(id: number) {
    this.isLoading = true;
    this.publishersService.deleteOne(id).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Xoá thành công!');
        this.renderPage();
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }
}

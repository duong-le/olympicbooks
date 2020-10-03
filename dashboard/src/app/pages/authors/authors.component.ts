import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/shared/Base/base.component';
import { Author } from 'src/app/shared/Interfaces/author.interface';
import { AuthorsService } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent extends BaseComponent<Author> {
  searchInputByName: string;

  columns = [{ title: 'Actions' }, { title: 'ID', key: 'id', sort: true }, { title: 'Tên tác giả', key: 'name', sort: true }];

  constructor(private authorsService: AuthorsService, private messageService: NzMessageService, private modalService: NzModalService) {
    super(authorsService);
  }

  onSearchByName() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByName) this.qb.setFilter({ field: 'name', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByName });
    this.renderPage();
  }

  showDeleteConfirm(id: number) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzOnOk: () => this.delete(id)
    });
  }

  delete(id: number) {
    this.isLoading = true;
    this.authorsService.deleteOne(id).subscribe(
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

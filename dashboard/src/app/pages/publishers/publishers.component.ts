import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';
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

  columns = [{ title: 'Actions' }, { title: 'ID', key: 'id', sort: true }, { title: 'Nhà xuất bản', key: 'name', sort: true }];

  constructor(private publishersService: PublishersService) {
    super(publishersService);
  }

  onSearchByName() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByName) this.qb.setFilter({ field: 'name', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByName });
    this.renderPage();
  }
}

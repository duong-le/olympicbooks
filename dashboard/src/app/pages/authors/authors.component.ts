import { Component } from '@angular/core';
import { CondOperator } from '@nestjsx/crud-request';
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

  columns = [{ title: 'Actions' }, { title: 'ID', key: 'id', sort: true }, { title: 'Tác giả', key: 'name', sort: true }];

  constructor(private authorsService: AuthorsService) {
    super(authorsService);
  }

  onSearchByName() {
    delete this.qb.queryObject.filter;
    if (this.searchInputByName) this.qb.setFilter({ field: 'name', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByName });
    this.renderPage();
  }
}

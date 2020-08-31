import { Component, OnInit } from '@angular/core';
import { RequestQueryBuilder, CondOperator } from '@nestjsx/crud-request';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AuthorsService } from './authors.service';
import { Author } from 'src/app/shared/Interfaces/author.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  qb: RequestQueryBuilder;

  searchInputById: number;
  searchInputByTitle: string;
  isLoading = false;
  total: number;
  pageIndex = 1;
  pageSize = 10;

  columns = [{ title: 'Actions' }, { title: 'ID', key: 'id', sort: true }, { title: 'Tác giả', key: 'name', sort: true }];

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.qb = RequestQueryBuilder.create().sortBy({ field: 'id', order: 'DESC' }).setPage(this.pageIndex).setLimit(this.pageSize);
    this.renderProducts();
  }

  renderProducts() {
    this.isLoading = true;
    this.authorsService.getManyAuthors(this.qb.queryObject).subscribe((response) => {
      this.authors = response.data;
      this.total = response.total;
      this.isLoading = false;
    });
  }

  onSearch() {
    delete this.qb.queryObject.filter;
    this.searchInputById && this.qb.setFilter({ field: 'id', operator: CondOperator.EQUALS, value: this.searchInputById });
    this.searchInputByTitle && this.qb.setFilter({ field: 'name', operator: CondOperator.CONTAINS_LOW, value: this.searchInputByTitle });
    this.renderProducts();
  }

  onTableQueryParamsChange(params: NzTableQueryParams): void {
    this.qb.setPage(params.pageIndex).setLimit(params.pageSize);
    const sort = params.sort.find((item) => item.value !== null);
    delete this.qb.queryObject.sort;
    sort
      ? this.qb.sortBy({ field: sort.key, order: sort.value === 'ascend' ? 'ASC' : 'DESC' })
      : this.qb.sortBy({ field: 'id', order: 'DESC' });
    this.renderProducts();
  }
}

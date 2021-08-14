import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseTableService } from '../../shared/Components/base-table/base-table.service';
import { Customer } from '../../shared/Interfaces/customer.interface';
import { Pagination } from '../../shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseTableService<Customer> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Customer[]> | Customer[]> {
    return this.http.get<Pagination<Customer[]> | Customer[]>(`${this.baseUrl}/customers`, { params });
  }

  deleteOne(id: number): Observable<void> {
    return;
  }
}

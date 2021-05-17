import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/Base/base.service';
import { Customer } from 'src/app/shared/Interfaces/customer.interface';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends BaseService<Customer> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Customer[]> | Customer[]> {
    return this.http.get<Pagination<Customer[]> | Customer[]>(`${this.baseUrl}/customers`, { params });
  }

  deleteOne(id: number): Observable<void> {
    return;
  }
}

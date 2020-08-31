import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';
import { Customer } from '../../shared/Interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getManyCustomers(params): Observable<Pagination<Customer[]>> {
    return this.http.get<Pagination<Customer[]>>(`${environment.apiUrl}/users`, { params });
  }
}

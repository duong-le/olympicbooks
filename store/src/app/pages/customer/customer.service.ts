import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer, UpdateCustomer } from 'src/app/shared/Interfaces/customer.interface';
import { Order } from 'src/app/shared/Interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}/users/me`);
  }

  updateMe(data: UpdateCustomer): Observable<UpdateCustomer> {
    return this.http.patch<UpdateCustomer>(`${environment.apiUrl}/users/me`, data);
  }

  getOrders(params): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/mine/orders`, { params });
  }
}

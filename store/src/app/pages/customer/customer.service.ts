import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Customer, UpdateCustomer } from '../../shared/Interfaces/customer.interface';
import { Order } from '../../shared/Interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}/customers/me`);
  }

  updateMe(data: UpdateCustomer): Observable<UpdateCustomer> {
    return this.http.patch<UpdateCustomer>(`${environment.apiUrl}/customers/me`, data);
  }

  getManyOrders(params: { [key: string]: string | string[] }): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/customers/me/orders`, { params });
  }

  getOneOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/customers/me/orders/${orderId}`);
  }
}

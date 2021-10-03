import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Order } from '../../shared/Interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  constructor(private http: HttpClient) {}

  createOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/customers/me/orders`, data);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Order } from '../../shared/Interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = `${environment.apiUrl}/sellers/me/shops`;

  constructor(protected http: HttpClient) {}

  getMany(shopId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/${shopId}/orders`);
  }

  getOne(shopId: number, orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${shopId}/orders/${orderId}`);
  }

  updateOne(shopId: number, orderId: number, data: FormData): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${shopId}/orders/${orderId}`, data);
  }
}

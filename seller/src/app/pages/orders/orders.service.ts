import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Order } from '../../shared/Interfaces/order.interface';
import { Pagination } from '../../shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = `${environment.apiUrl}/sellers/me/shops`;

  constructor(protected http: HttpClient) {}

  getMany(shopId: number, params: { [key: string]: string | string[] }): Observable<Pagination<Order[]>> {
    return this.http.get<Pagination<Order[]>>(`${this.baseUrl}/${shopId}/orders`, { params });
  }

  getOne(shopId: number, orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${shopId}/orders/${orderId}`);
  }

  updateOne(shopId: number, orderId: number, data: FormData): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${shopId}/orders/${orderId}`, data);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseTableService } from '../../shared/Components/base-table/base-table.service';
import { Order } from '../../shared/Interfaces/order.interface';
import { Pagination } from '../../shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseTableService<Order> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Order[]> | Order[]> {
    return this.http.get<Pagination<Order[]> | Order[]>(`${this.baseUrl}/orders`, { params });
  }

  getOne(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
  }

  createOne(data: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, data);
  }

  updateOne(id: number, data: Order): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/orders/${id}`, data);
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/orders/${id}`);
  }
}

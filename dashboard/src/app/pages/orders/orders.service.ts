import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/Base/base.service';
import { Order } from 'src/app/shared/Interfaces/order.interface';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService<Order> {
  getMany(params): Observable<Pagination<Order[]> | Order[]> {
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';
import { Order } from 'src/app/shared/Interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getManyOrders(params): Observable<Pagination<Order[]>> {
    return this.http.get<Pagination<Order[]>>(`${environment.apiUrl}/orders`, { params });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Order } from '../../shared/Interfaces/order.interface';
import { ShippingMethod } from '../../shared/Interfaces/shipping.interface';
import { TransactionMethod } from '../../shared/Interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  constructor(private http: HttpClient) {}

  getTransactionMethods(): Observable<TransactionMethod[]> {
    return this.http.get<TransactionMethod[]>(`${environment.apiUrl}/transactions/methods`);
  }

  getShippingMethods(transactionValue: number): Observable<ShippingMethod[]> {
    return this.http.get<ShippingMethod[]>(`${environment.apiUrl}/shippings/methods?transactionValue=${transactionValue}`);
  }

  createOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/me/orders`, data);
  }
}

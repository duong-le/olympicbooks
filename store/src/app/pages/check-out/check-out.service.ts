import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransactionMethod } from 'src/app/shared/Interfaces/transaction.interface';
import { ShippingMethod } from 'src/app/shared/Interfaces/shipping.interface';
import { Order } from 'src/app/shared/Interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  constructor(private http: HttpClient) {}

  getTransactionMethods(): Observable<TransactionMethod[]> {
    return this.http.get<TransactionMethod[]>(`${environment.apiUrl}/transactions/methods`);
  }

  getShippingMethods(transactionValue: number): Observable<ShippingMethod[]> {
    return this.http.get<ShippingMethod[]>(
      `${environment.apiUrl}/shippings/methods?transactionValue=${transactionValue}`
    );
  }

  createOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/mine/orders`, data);
  }
}

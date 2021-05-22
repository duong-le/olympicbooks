import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Product } from '../../shared/Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getOneProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  getManyProducts(params: { [key: string]: string | string[] }): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`, { params });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Pagination } from '../../shared/Interfaces/pagination.interface';
import { Product } from '../../shared/Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = `${environment.apiUrl}/me/shops`;

  constructor(protected http: HttpClient) {}

  getMany(shopId: number, params: { [key: string]: string | string[] }): Observable<Pagination<Product[]>> {
    return this.http.get<Pagination<Product[]>>(`${this.baseUrl}/${shopId}/products`, { params });
  }

  getOne(shopId: number, productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${shopId}/products/${productId}`);
  }

  createOne(shopId: number, data: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/${shopId}/products`, data);
  }

  updateOne(shopId: number, productId: number, data: FormData): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${shopId}/products/${productId}`, data);
  }

  deleteOne(shopId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${shopId}/products/${productId}`);
  }
}

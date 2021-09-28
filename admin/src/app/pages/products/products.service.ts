import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseTableService } from '../../shared/Components/base-table/base-table.service';
import { Pagination } from '../../shared/Interfaces/pagination.interface';
import { Product } from '../../shared/Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseTableService<Product> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Product[]> | Product[]> {
    return this.http.get<Pagination<Product[]> | Product[]>(`${this.baseUrl}/products`, { params });
  }

  getOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  createOne(data: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, data);
  }

  updateOne(id: number, data: FormData): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/products/${id}`, data);
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }
}

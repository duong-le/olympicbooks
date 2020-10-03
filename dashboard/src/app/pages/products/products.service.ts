import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/Base/base.service';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product> {
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

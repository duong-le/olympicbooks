import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';
import { Product } from 'src/app/shared/Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getManyProducts(params): Observable<Pagination<Product[]>> {
    return this.http.get<Pagination<Product[]>>(`${environment.apiUrl}/products`, { params });
  }
}

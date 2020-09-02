import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/Base/base.service';
import { Product } from 'src/app/shared/Interfaces/product.interface';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Product[]>> {
    return this.http.get<Pagination<Product[]>>(`${this.baseUrl}/products`, { params });
  }
}

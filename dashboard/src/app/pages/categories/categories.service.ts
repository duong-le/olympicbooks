import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/Base/base.service';
import { Category } from 'src/app/shared/Interfaces/category.interface';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService<Category> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Category[]>> {
    return this.http.get<Pagination<Category[]>>(`${this.baseUrl}/categories`, { params });
  }
}

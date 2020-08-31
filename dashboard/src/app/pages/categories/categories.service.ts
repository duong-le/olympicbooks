import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getManyCategories(params): Observable<Pagination<Category[]>> {
    return this.http.get<Pagination<Category[]>>(`${environment.apiUrl}/categories`, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getOneCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }

  getManyCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }
}

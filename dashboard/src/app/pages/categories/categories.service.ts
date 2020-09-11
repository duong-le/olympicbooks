import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/Interfaces/category.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  getMany(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  createOne(data: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, data);
  }

  updateOne(id: number, data: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.baseUrl}/categories/${id}`, data);
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }
}

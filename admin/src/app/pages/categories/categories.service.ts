import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Category } from '../../shared/Interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl = `${environment.apiUrl}/categories`;

  constructor(protected http: HttpClient) {}

  getMany(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createOne(data: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`, data);
  }

  updateOne(id: number, data: FormData): Observable<Category> {
    return this.http.patch<Category>(`${this.baseUrl}/${id}`, data);
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

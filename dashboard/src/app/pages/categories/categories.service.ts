import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Attribute } from '../../shared/Interfaces/attribute.interface';
import { Category } from '../../shared/Interfaces/category.interface';

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

  createOne(data: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, data);
  }

  updateOne(id: number, data: FormData): Observable<Category> {
    return this.http.patch<Category>(`${this.baseUrl}/categories/${id}`, data);
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }

  createOneAttribute(categoryId: number, data: Attribute): Observable<Attribute> {
    return this.http.post<Attribute>(`${this.baseUrl}/categories/${categoryId}/attributes`, data);
  }

  updateOneAttribute(categoryId: number, attributeId: number, data: Attribute): Observable<Attribute> {
    return this.http.patch<Attribute>(
      `${this.baseUrl}/categories/${categoryId}/attributes/${attributeId}`,
      data
    );
  }

  deleteOneAttribute(categoryId: number, attributeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${categoryId}/attributes/${attributeId}`);
  }
}

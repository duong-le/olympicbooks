import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Attribute, AttributeValue } from '../../shared/Interfaces/attribute.interface';
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

  getManyAttributes(categoryId: number): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`${this.baseUrl}/${categoryId}/attributes`);
  }

  getOneAttribute(categoryId: number, attributeId: number): Observable<Attribute> {
    return this.http.get<Attribute>(`${this.baseUrl}/${categoryId}/attributes/${attributeId}`);
  }

  createOneAttribute(categoryId: number, data: Attribute): Observable<Attribute> {
    return this.http.post<Attribute>(`${this.baseUrl}/${categoryId}/attributes`, data);
  }

  updateOneAttribute(categoryId: number, attributeId: number, data: Attribute): Observable<Attribute> {
    return this.http.patch<Attribute>(`${this.baseUrl}/${categoryId}/attributes/${attributeId}`, data);
  }

  deleteOneAttribute(categoryId: number, attributeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${categoryId}/attributes/${attributeId}`);
  }

  createAttributeValue(
    categoryId: number,
    attributeId: number,
    data: AttributeValue
  ): Observable<AttributeValue> {
    return this.http.post<AttributeValue>(
      `${this.baseUrl}/${categoryId}/attributes/${attributeId}/attribute-values`,
      data
    );
  }
}

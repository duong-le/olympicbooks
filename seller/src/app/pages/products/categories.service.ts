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
  baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  getMany(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/sellers/categories`);
  }

  getOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/sellers/categories/${id}`);
  }

  getManyAttributes(categoryId: number): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`${this.baseUrl}/sellers/categories/${categoryId}/attributes`);
  }

  getOneAttribute(categoryId: number, attributeId: number): Observable<Attribute> {
    return this.http.get<Attribute>(
      `${this.baseUrl}/sellers/categories/${categoryId}/attributes/${attributeId}`
    );
  }

  createAttributeValue(
    categoryId: number,
    attributeId: number,
    data: AttributeValue
  ): Observable<AttributeValue> {
    return this.http.post<AttributeValue>(
      `${this.baseUrl}/sellers/categories/${categoryId}/attributes/${attributeId}/attribute-values`,
      data
    );
  }
}

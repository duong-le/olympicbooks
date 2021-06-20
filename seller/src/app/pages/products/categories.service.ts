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
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  getOne(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${categoryId}`);
  }

  getManyAttributes(categoryId: number): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`${this.baseUrl}/${categoryId}/attributes`);
  }

  getOneAttribute(categoryId: number, attributeId: number): Observable<Attribute> {
    return this.http.get<Attribute>(`${this.baseUrl}/${categoryId}/attributes/${attributeId}`);
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

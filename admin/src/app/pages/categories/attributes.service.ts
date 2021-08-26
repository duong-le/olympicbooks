import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Attribute, AttributeValue } from '../../shared/Interfaces/attribute.interface';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {
  baseUrl = `${environment.apiUrl}/attributes`;

  constructor(protected http: HttpClient) {}

  getMany(categoryId: string = null): Observable<Attribute[]> {
    const params = categoryId ? { params: { categoryId } } : {};
    return this.http.get<Attribute[]>(this.baseUrl, params);
  }

  getOne(id: number): Observable<Attribute> {
    return this.http.get<Attribute>(`${this.baseUrl}/${id}`);
  }

  createOne(data: Attribute): Observable<Attribute> {
    return this.http.post<Attribute>(this.baseUrl, data);
  }

  updateOne(id: number, data: Attribute): Observable<Attribute> {
    return this.http.patch<Attribute>(`${this.baseUrl}/${id}`, data);
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createAttributeValue(id: number, data: AttributeValue): Observable<AttributeValue> {
    return this.http.post<AttributeValue>(`${this.baseUrl}/${id}/attribute-values`, data);
  }
}

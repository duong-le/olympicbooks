import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Shop } from '../../shared/Interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  baseUrl = `${environment.apiUrl}/sellers/me/shops`;

  constructor(protected http: HttpClient) {}

  getMany(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.baseUrl);
  }

  getOne(id: number): Observable<Shop> {
    return this.http.get<Shop>(`${this.baseUrl}/${id}`);
  }

  createOne(data: FormData): Observable<Shop> {
    return this.http.post<Shop>(this.baseUrl, data);
  }

  updateOne(id: number, data: Shop): Observable<Shop> {
    return this.http.patch<Shop>(`${this.baseUrl}/${id}`, data);
  }
}

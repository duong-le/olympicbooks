import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Shop } from '../../shared/Interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  baseUrl = `${environment.apiUrl}/me/shops`;

  constructor(protected http: HttpClient) {}

  getMany(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.baseUrl);
  }

  getOne(shopId: number): Observable<Shop> {
    return this.http.get<Shop>(`${this.baseUrl}/${shopId}`);
  }

  createOne(data: FormData): Observable<Shop> {
    return this.http.post<Shop>(this.baseUrl, data);
  }

  updateOne(shopId: number, data: FormData): Observable<Shop> {
    return this.http.patch<Shop>(`${this.baseUrl}/${shopId}`, data);
  }
}

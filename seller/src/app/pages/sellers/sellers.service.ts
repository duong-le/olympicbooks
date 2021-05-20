import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Seller } from '../../shared/Interfaces/seller.interface';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  baseUrl = `${environment.apiUrl}/sellers`;

  constructor(protected http: HttpClient) {}

  getOne(): Observable<Seller> {
    return this.http.get<Seller>(`${this.baseUrl}/me`);
  }

  createOne(data: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.baseUrl, data);
  }

  updateOne(data: Seller): Observable<Seller> {
    return this.http.patch<Seller>(`${this.baseUrl}/me`, data);
  }
}

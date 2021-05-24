import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Shop } from '../../shared/Interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  constructor(private http: HttpClient) {}

  getManyShops(params: { [key: string]: string | string[] }): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${environment.apiUrl}/shops`, { params });
  }

  getOneShop(id: number): Observable<Shop> {
    return this.http.get<Shop>(`${environment.apiUrl}/shops/${id}`);
  }
}

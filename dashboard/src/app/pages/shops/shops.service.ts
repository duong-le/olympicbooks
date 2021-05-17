import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '../../shared/Base/base.service';
import { Pagination } from '../../shared/Interfaces/pagination.interface';
import { Shop } from '../../shared/Interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopsService extends BaseService<Shop> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Shop[]> | Shop[]> {
    return this.http.get<Pagination<Shop[]> | Shop[]>(`${this.baseUrl}/shops`, { params });
  }

  deleteOne(id: number): Observable<void> {
    return;
  }
}

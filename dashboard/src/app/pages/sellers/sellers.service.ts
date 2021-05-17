import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '../../shared/Base/base.service';
import { Pagination } from '../../shared/Interfaces/pagination.interface';
import { Seller } from '../../shared/Interfaces/seller.interface';

@Injectable({
  providedIn: 'root'
})
export class SellersService extends BaseService<Seller> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Seller[]> | Seller[]> {
    return this.http.get<Pagination<Seller[]> | Seller[]>(`${this.baseUrl}/sellers`, { params });
  }

  deleteOne(id: number): Observable<void> {
    return;
  }
}

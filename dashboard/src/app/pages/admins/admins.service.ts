import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '../../shared/Base/base.service';
import { Admin } from '../../shared/Interfaces/admin.interface';
import { Pagination } from '../../shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminsService extends BaseService<Admin> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Admin[]> | Admin[]> {
    return this.http.get<Pagination<Admin[]> | Admin[]>(`${this.baseUrl}/admins`, { params });
  }

  deleteOne(id: number): Observable<void> {
    return;
  }
}

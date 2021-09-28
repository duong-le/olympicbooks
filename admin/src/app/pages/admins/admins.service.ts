import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseTableService } from '../../shared/Components/base-table/base-table.service';
import { Admin } from '../../shared/Interfaces/admin.interface';
import { Pagination } from '../../shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminsService extends BaseTableService<Admin> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Admin[]> | Admin[]> {
    return this.http.get<Pagination<Admin[]> | Admin[]>(`${this.baseUrl}/admins`, { params });
  }

  deleteOne(id: number): Observable<void> {
    return;
  }
}

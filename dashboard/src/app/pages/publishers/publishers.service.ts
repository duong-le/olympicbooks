import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '../../shared/Base/base.service';
import { Pagination } from '../../shared/Interfaces/pagination.interface';
import { Publisher } from '../../shared/Interfaces/publisher.interface';

@Injectable({
  providedIn: 'root'
})
export class PublishersService extends BaseService<Publisher> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Publisher[]> | Publisher[]> {
    return this.http.get<Pagination<Publisher[]> | Publisher[]>(`${this.baseUrl}/publishers`, { params });
  }

  getOne(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.baseUrl}/publishers/${id}`);
  }

  createOne(data: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(`${this.baseUrl}/publishers`, data);
  }

  updateOne(id: number, data: Publisher): Observable<Publisher> {
    return this.http.patch<Publisher>(`${this.baseUrl}/publishers/${id}`, data);
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/publishers/${id}`);
  }
}

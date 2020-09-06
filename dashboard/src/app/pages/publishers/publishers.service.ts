import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/Base/base.service';
import { Publisher } from 'src/app/shared/Interfaces/publisher.interface';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class PublishersService extends BaseService<Publisher> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Publisher[]>> {
    return this.http.get<Pagination<Publisher[]>>(`${this.baseUrl}/publishers`, { params });
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

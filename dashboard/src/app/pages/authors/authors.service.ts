import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/Base/base.service';
import { Author } from 'src/app/shared/Interfaces/author.interface';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseService<Author> {
  getMany(params: { [key: string]: string | string[] }): Observable<Pagination<Author[]>> {
    return this.http.get<Pagination<Author[]>>(`${this.baseUrl}/authors`, { params });
  }

  getOne(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/authors/${id}`);
  }

  createOne(data: Author): Observable<Author> {
    return this.http.post<Author>(`${this.baseUrl}/authors`, data);
  }

  updateOne(id: number, data: Author): Observable<Author> {
    return this.http.patch<Author>(`${this.baseUrl}/authors/${id}`, data);
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/authors/${id}`);
  }
}

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
}

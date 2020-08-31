import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';
import { Author } from 'src/app/shared/Interfaces/author.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getManyAuthors(params): Observable<Pagination<Author[]>> {
    return this.http.get<Pagination<Author[]>>(`${environment.apiUrl}/authors`, { params });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Author } from '../../shared/Interfaces/author.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  getMany(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseUrl}/authors`);
  }

  getOne(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/authors/${id}`);
  }
}

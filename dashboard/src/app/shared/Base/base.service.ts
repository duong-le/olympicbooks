import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Pagination } from '../../shared/Interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  abstract getMany(params: { [key: string]: string | string[] }): Observable<Pagination<T[]> | T[]>;

  abstract deleteOne(id: number): Observable<void>;
}

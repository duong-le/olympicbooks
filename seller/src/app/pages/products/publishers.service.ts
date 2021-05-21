import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Publisher } from '../../shared/Interfaces/publisher.interface';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  getMany(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${this.baseUrl}/publishers`);
  }

  getOne(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.baseUrl}/publishers/${id}`);
  }
}

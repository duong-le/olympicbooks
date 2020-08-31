import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/shared/Interfaces/pagination.interface';
import { Publisher } from 'src/app/shared/Interfaces/publisher.interface';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  constructor(private http: HttpClient) {}

  getManyPublishers(params): Observable<Pagination<Publisher[]>> {
    return this.http.get<Pagination<Publisher[]>>(`${environment.apiUrl}/publishers`, { params });
  }
}

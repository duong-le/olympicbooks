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
}

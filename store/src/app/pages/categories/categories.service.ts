import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Author } from '../../shared/Interfaces/author.interface';
import { Category } from '../../shared/Interfaces/category.interface';
import { Publisher } from '../../shared/Interfaces/publisher.interface';
import { Summary } from '../../shared/Interfaces/summary';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesSubject: BehaviorSubject<Category[]>;
  public categories$: Observable<Category[]>;

  constructor(private http: HttpClient) {
    this.categoriesSubject = new BehaviorSubject<Category[]>([]);
    this.categories$ = this.categoriesSubject.asObservable();
    this.getManyCategories().subscribe((response) => this.categoriesSubject.next(response));
  }

  public get categoriesValue() {
    return this.categoriesSubject.value;
  }

  getOneCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }

  getManyCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  getPublishersByCategory(id: number): Observable<Summary<Publisher>[]> {
    return this.http.get<Summary<Publisher>[]>(`${environment.apiUrl}/categories/${id}/publishers`);
  }

  getAuthorsByCategory(id: number): Observable<Summary<Author>[]> {
    return this.http.get<Summary<Author>[]>(`${environment.apiUrl}/categories/${id}/authors`);
  }
}

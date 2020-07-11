import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/shared/Interfaces/category.interface';
import { Count } from 'src/app/shared/Interfaces/count.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesSubject: BehaviorSubject<Category[]>;
  public categories$: Observable<Category[]>;

  constructor(private http: HttpClient) {
    this.categoriesSubject = new BehaviorSubject<Category[]>([]);
    this.categories$ = this.categoriesSubject.asObservable();

    this.getManyCategories(null).subscribe((response) =>
      this.categoriesSubject.next(response)
    );
  }

  public get categoriesValue() {
    return this.categoriesSubject.value;
  }

  getOneCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }

  getManyCategories(params): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`, { params });
  }

  getPublishersByCategory(id: number): Observable<Count[]> {
    return this.http.get<Count[]>(`${environment.apiUrl}/categories/${id}/publishers`);
  }

  getAuthorsByCategory(id: number): Observable<Count[]> {
    return this.http.get<Count[]>(`${environment.apiUrl}/categories/${id}/authors`);
  }
}

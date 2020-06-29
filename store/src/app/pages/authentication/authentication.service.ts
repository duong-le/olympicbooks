import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Authentication } from 'src/app/shared/Interfaces/authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Authentication>;
  public currentUser: Observable<Authentication>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Authentication>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  signIn(data: Authentication): Observable<Authentication> {
    return this.http
      .post<Authentication>(`${environment.apiUrl}/auth/signin`, data)
      .pipe(
        map((response: any) => {
          const payload = JSON.parse(atob(response.accessToken.split('.')[1]));
          const user = { ...payload, accessToken: response.accessToken };
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  signUp(data: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(
      `${environment.apiUrl}/auth/signup`,
      data
    );
  }

  signOut() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
